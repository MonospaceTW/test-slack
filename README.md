# SlackApiHelper

## 使用套件
- Slack 開發 [Slack Developer Kit for Node.js](http://slackapi.github.io/node-slack-sdk/)

## 安裝套件

```
$ npm install SlackApiHelper
```
(還沒發佈到npm)

## 取得授權
- 取得一個 legacy-tokens [legacy-tokens](https://api.slack.com/custom-integrations/legacy-tokens)

- - [tokens 種類] (https://api.slack.com/docs/token-types)
- - [tokens scopes] (https://api.slack.com/scopes)

## 存成json檔
- config.json

```json
{
    "webclient_token" : "xox?-your-webclient_token"
}
```

## sample

```javascript
var fs = require("fs");

let contents = fs.readFileSync("config.json");
let jsonContent = JSON.parse(contents);

// legacy-tokens
const token = jsonContent.webclient_token;
// 聊天室
const to = "#general";

// 基本使用
let slackApiHelper = new SlackApiHelper(token);

// 發送 WebClient 訊息
//
// *裡面文字* => 會呈現粗體 ， * 符號會消失
// <http://example.com> => 會呈現超連結 <> 符號會消失 ， 若不是超連結會保留 ， 如 <asd>
//
// username     為發送訊息時呈現的名字
// icon_emoji   :monkey_face: 用內建猴子臉做為頭像
// icon_url     https://www.google.com.tw/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png 用 google 的 logo作為頭像
// as_user      true 預設為flase 值為真就代表用真實使用者帳號發送訊息 ， 前面的名字 頭像等將失去作用
// 其他相關參數參考 ( https://api.slack.com/methods/chat.postMessage )
await slackApiHelper.sendWebClientMessage(
    to,
    '這是一則給 #general 而且來自於 *紅色巨鳥*.<https://www.google.com.tw/>',
    {
        username: 'monobot',
        icon_url: 'https://www.google.com.tw/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    },
).then((result) => {
    expect(result.ok).toBe(true);
});
```

## Dev

使用 `npm test` 測試開發

## License

MIT

<hr>

# ESLint

## 使用套件
- ESLint - 可組裝的JavaScript和JSX檢查工具 [ESLint](http://eslint.cn/)

## 安裝套件

```
$ npm install eslint --save-dev
```

## 初始化
```
$ ./node_modules/.bin/eslint --init
```

## 檢查文檔風格
```
$ ./node_modules/.bin/eslint yourfile.js
```

## 設定規則
[規則文件](http://eslint.cn/docs/rules/)
開啟 .eslintrc.json

```json
// 用airbnb風格
// 規則 每一行程式碼長度不超過200 但忽略註解與網址 (預設每一行程式碼長度不超過80，且都會檢查)
// 縮排4格
// 取消jsdoc註解規則，想怎麼註解，就怎麼註解
// 用版本8來檢查語法，版本過低檢查新版語法會出問題
{
    "extends": "airbnb-base",
    "rules": {
        "max-len"    : ["error", {"code": 200, "ignoreComments": true, "ignoreUrls": true   }],
        "indent": ["error", 4],
        "require-jsdoc": ["error", {
            "require": {
                "FunctionDeclaration": false,
                "MethodDefinition": false,
                "ClassDeclaration": false,
                "ArrowFunctionExpression": false,
                "FunctionExpression": false
            }
        }]
    },
    "parserOptions": {
        "ecmaVersion": 8
      }
}
```
