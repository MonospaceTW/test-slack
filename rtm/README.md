# 玩玩 RTM

## 使用套件
- Slack 開發 [Slack Developer Kit for Node.js](http://slackapi.github.io/node-slack-sdk/)

## 安裝套件

```
$ npm install @slack/client
```

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

## 指令列表
- command.json

```json
{
    "!info"   : "slack bot say hellow~",
    "!xd"     : "XD",
    "!date"   : "!yourFunc",
    "!fuck"   : "you mom fly fast in the sky!"
}
```
打指令就會回復存好的文字
內容有 ! 的是在程式碼裡寫好的 function ，但遇到問題 不同指令會帶不同參數 所以只有一個指令

設計邏輯：
```javascript
tool = {}
tool.yourFunc = () => {};
tool[jsonText](); // jsonText 會去掉 !
```

## 使用方法

$ node rtm.js

## Dev

使用 `node rtm.js` 測試開發

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
