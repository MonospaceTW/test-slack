const { WebClient } = require('@slack/client');

// 發送 WebClient 訊息的物件
class SlackApiHelper {
    // 同時建立 WebClient
    constructor(token = '') {
        this.token = token;
        this.web = new WebClient(this.token);
    }

    /**
     * 發送WebClient訊息(利用web api)
     * @param {string} to 要發送給誰，can be a channel ID(or name), a DM ID, a MPDM ID, or a group ID
     * @param {string} text 文字訊息
     * @param {json} attach 附加訊息，如按鈕，圖片等.
     */
    async sendWebClientMessage(to = '', text = '', attach = {}) {
        return (
            new Promise((resolve, reject) => {
                const result = {};
                this.web.chat.postMessage(to, text, attach)
                    .then((res) => {
                        result.ok = true;
                        result.mes = res;
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            })
        );
    }
}

module.exports = SlackApiHelper;
