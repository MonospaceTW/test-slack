# SlackApiHelper

## 使用套件
- Slack 開發 [Slack Developer Kit for Node.js](http://slackapi.github.io/node-slack-sdk/)

## 安裝套件

```
npm install SlackApiHelper
```

## 取得授權
- 取得一個 incoming-webhooks-url [incoming-webhooks-url](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks)
- 取得一個 legacy-tokens [legacy-tokens](https://api.slack.com/custom-integrations/legacy-tokens)

- - [tokens 種類] (https://api.slack.com/docs/token-types)
- - [tokens scopes] (https://api.slack.com/scopes)

## 存成json檔
- config.json

```json
{
    "webhooks_url"    : "your/webhooks_url/",
    "webclient_token" : "xox?-your-webclient_token"
}
```

## sample

```javascript
var fs = require("fs");

let contents = fs.readFileSync("config.json");
let jsonContent = JSON.parse(contents);

// incoming-webhooks-url
const url = jsonContent.webhooks_url;
// legacy-tokens
const token = jsonContent.webclient_token;
// 聊天室
const to = "#general";

let slackApiHelper = new SlackApiHelper();

// 基本使用
建立 incoming-webhooks
await slackApiHelper.establishWebhook(url);

發送 incoming-webhooks 訊息
await slackApiHelper.sendWebhookMessage(
{ 
    "text": "這是一則給 #general 而且來自於 *紅色巨鳥*.", 
    "channel": to,
    "username": "fapo-bot", 
    "icon_emoji": ":monkey_face:",
});

建立 WebClient
await slackApiHelper.establishWebClient(token);

發送 WebClient 訊息
await slackApiHelper.sendWebClientMessage(
    to,
    "這是一則給 #general 而且來自於 *紅色巨鳥*.",
    { 
        "username": "monobot", 
        "icon_emoji": ":monkey_face:",
    }
);
```

## Dev

使用 `npm test` 測試開發

## License

MIT
