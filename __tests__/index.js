const SlackApiHelper = require('./../index')
var fs = require("fs");

let contents = fs.readFileSync("config.json");
let jsonContent = JSON.parse(contents);

const url = jsonContent.webhooks_url;
const token = jsonContent.webclient_token;
const to = "#random";
let slackApiHelper = new SlackApiHelper();

test('establishWebhook', async () => 
{
    let result = await slackApiHelper.establishWebhook(url);
});

test('sendWebhookMessage', async () => 
{
    let result = await slackApiHelper.sendWebhookMessage(
    { 
        "text": "這是一則給 #general 而且來自於 *紅色巨鳥*.", 
        "channel": to,
        //"link_names": 1, 
        "username": "fapo-bot", 
        "icon_emoji": ":monkey_face:",
        "attachments": [
            {
                "text": "Choose a game to play",
                "fallback": "You are unable to choose a game",
                "callback_id": "wopr_game",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "game",
                        "text": "麻將",
                        "type": "button",
                        "value": "麻將"
                    },
                    {
                        "name": "game",
                        "text": "麻將",
                        "type": "button",
                        "value": "麻將"
                    },
                    {
                        "name": "game",
                        "text": "還是麻將",
                        "style": "danger",
                        "type": "button",
                        "value": "還是麻將",
                        "confirm": 
                        {
                            "title": "這麼不想玩?",
                            "text": "你想被小丑打?",
                            "ok_text": "回去玩麻將",
                            "dismiss_text": "我要玩麻將"
                        }
                    }
                ]
            }
        ],
    });
});

test('establishWebClient', async () => 
{
    let result = await slackApiHelper.establishWebClient(token);
});

test('sendWebClientMessage', async () => 
{
    let result = await slackApiHelper.sendWebClientMessage(
    to,
    "這是一則給 #general 而且來自於 *紅色巨鳥*.",
    { 
        //"link_names": 1, 
        "username": "monobot", 
        "icon_emoji": ":monkey_face:",
        "attachments": [
            {
                "text": "Choose a game to play",
                "fallback": "You are unable to choose a game",
                "callback_id": "wopr_game",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "game",
                        "text": "麻將",
                        "type": "button",
                        "value": "麻將"
                    },
                    {
                        "name": "game",
                        "text": "麻將",
                        "type": "button",
                        "value": "麻將"
                    },
                    {
                        "name": "game",
                        "text": "還是麻將",
                        "style": "danger",
                        "type": "button",
                        "value": "還是麻將",
                        "confirm": 
                        {
                            "title": "這麼不想玩?",
                            "text": "你想被小丑打?",
                            "ok_text": "回去玩麻將",
                            "dismiss_text": "我要玩麻將"
                        }
                    }
                ]
            }
        ],
    });
});
