const {
    RtmClient, CLIENT_EVENTS, RTM_EVENTS, WebClient,
} = require('@slack/client');
const moment = require('moment');
const fs = require('fs');

// 拿 token
const tokenData = fs.readFileSync('../config.json');
const jsonToken = JSON.parse(tokenData);
const token = jsonToken.webclient_token;

// 讀指令列表
const commandData = fs.readFileSync('command.json');
const jsonCommand = JSON.parse(commandData);
const command = Object.keys(jsonCommand);

// 存資料
const appData = {};

// 初始化 WebClient
const web = new WebClient(token);

// 取得所有已加入的聊天室
const channelListPromise = web.channels.list();

const tools = {};
// 測試用 可以丟時間回去
tools.date = (rtm, to) => {
    rtm.sendMessage(moment().format('MMMM Do YYYY, h:mm:ss a'), to)
        .then(() => console.log(`Message sent to channel ${to}`))
        .catch(console.error);
};
// 送訊息的 function
tools.sendMessage = (rtm, message, to) => {
    rtm.sendMessage(message, to)
        .then(() => console.log(`Message sent to channel ${to}`))
        .catch(console.error);
};


// 初始化 rtm 客戶端
// 參數尚未研究
const rtm = new RtmClient(
    token,
    {
        dataStore: false,
        useRtmConnect: true,
    },
);

// 授權成功 但尚未開起連線時
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (connectData) => {
    // 將本身使用者的 id 存起來
    appData.selfId = connectData.self.id;
    console.log(`Logged in as ${appData.selfId} of team ${connectData.team.id}`);
});

// 連線成功 ， 可以接收與發送訊息
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
    console.log('Ready');

    // 隨便抓一個目前已經加入的聊天室
    channelListPromise.then((res) => {
        const channel = res.channels.find(c => c.is_member);

        if (channel) {
            appData.channel = channel;
        } else {
            console.log('This bot does not belong to any channels');
        }
    });
});

// 收到訊息的事件 所有地方的訊息都會觸發
// 可以判斷是系統事件 來自哪裡 之類的
// 參考 https://api.slack.com/events/message
// 範例 if( (message.subtype && message.subtype === 'bot_message') || (!message.subtype && message.user === appData.selfId) )
rtm.on(RTM_EVENTS.MESSAGE, (message) => {
    // 收到的訊息在指令列表裡
    if (command.includes(message.text)) {
        if (jsonCommand[message.text].charAt(0) === '!') { // 他要啟動訊息指令
            tools[jsonCommand[message.text].substr(1)](rtm, appData.channel.id);
        } else { // 單純發訊息
            tools.sendMessage(rtm, jsonCommand[message.text], appData.channel.id);
        }
    }

    console.log('New message: ', message.text);
});

// 開始 RTM 連線
rtm.start();
