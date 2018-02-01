const {IncomingWebhook} = require('@slack/client');
const {WebClient} = require('@slack/client');

/**
 * 可以發送IncomingWebhook與WebClient訊息的物件
 */
class SlackApiHelper {
    /**
     * 建構子 沒用到
     */
    constructor() {

    }

    /**
     * 建立一個可以發送IncomingWebhook與WebClient訊息的物件
     * @param {string} url IncomingWebhook的url
     */
    async establishWebhook( url = '' ) {
        this.url = url;
        this.webhook = new IncomingWebhook(this.url);
    }

    /**
     * 發送IncomingWebhook訊息.
     * @param {string} text 要發送的訊息
     */
    async sendWebhookMessage(text = '') {
        this.webhook.send(text, function(err, res) {
            if (err) {
                console.log('Error:', err);
            } else {
                // success
            }
        });
    }

    /**
     * 建立WebClient
     * @param {string} token 一個合法的token
     */
    async establishWebClient(token = '') {
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
        this.web.chat.postMessage(to, text, attach)
            .then((res) => {
                console.log('Message sent: ', res.ts);
            })
            .catch(console.error);
    }
}

module.exports = SlackApiHelper;
