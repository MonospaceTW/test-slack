const { RtmClient, CLIENT_EVENTS, RTM_EVENTS, WebClient } = require('@slack/client');
var moment = require('moment');
var fs = require("fs");

let configa = fs.readFileSync("config.json");
let jsonContenta = JSON.parse(configa);

const token = jsonContenta.webclient_token;

// Cache of data
const appData = {};

// Need a web client to find a channel where the app can post a message
const web = new WebClient(token);

// Load the current channels list asynchrously
let channelListPromise = web.channels.list();

let contents = fs.readFileSync("command.json");
let jsonContent = JSON.parse(contents);
let command = Object.keys(jsonContent)
let tools = {};
tools.date = (rtm, to) =>
{
    rtm.sendMessage(moment().format('MMMM Do YYYY, h:mm:ss a'), to)
        // Returns a promise that resolves when the message is sent
        .then(() => console.log(`Message sent to channel ${to}`))
        .catch(console.error);
}

tools.sendMessage = (rtm, message, to) =>
{
    rtm.sendMessage(message, to)
        // Returns a promise that resolves when the message is sent
        .then(() => console.log(`Message sent to channel ${to}`))
        .catch(console.error);
}


// Initialize the RTM client with the recommended settings. Using the defaults for these
// settings is deprecated.
const rtm = new RtmClient(
    token, 
    {
        dataStore: false,
        useRtmConnect: true,
    }
);

// The client will emit an RTM.AUTHENTICATED event on when the connection data is avaiable
// (before the connection is open)
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (connectData) => 
{
    // Cache the data necessary for this app in memory
    appData.selfId = connectData.self.id;
    console.log(`Logged in as ${appData.selfId} of team ${connectData.team.id}`);
});

// The client will emit an RTM.RTM_CONNECTION_OPENED the connection is ready for
// sending and recieving messages
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => 
{
    console.log(`Ready`);

    channelListPromise.then((res) => 
    {
        // Take any channel for which the bot is a member
        const channel = res.channels.find(c => c.is_member);

        if (channel)
        {
            appData.channel = channel;
        } 
        else 
        {
            console.log('This bot does not belong to any channels, invite it to at least one and try again');
        }
    });
});

rtm.on(RTM_EVENTS.MESSAGE, message => 
{
    // For structure of `message`, see https://api.slack.com/events/message

    // Skip messages that are from a bot or my own user ID
    if ((message.subtype && message.subtype === "bot_message") || (!message.subtype && message.user === appData.selfId) || true) 
    {
        if(command.includes(message.text))
        {
            if( jsonContent[message.text].charAt(0) === '!' )
            {
                tools[message.text.substr(1)](rtm, appData.channel.id);
            }
            else
            {
                tools.sendMessage(rtm, jsonContent[message.text], appData.channel.id);
            }
        }
    }
    // Log the message
    console.log("New message: ", message.text);
    return;
});

// Start the connecting process
rtm.start();