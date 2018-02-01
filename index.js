const { IncomingWebhook } = require('@slack/client');
const { WebClient } = require('@slack/client');
const { RtmClient, CLIENT_EVENTS } = require('@slack/client');

class SlackApiHelper 
{
    constructor() 
    {

    }

    async establishWebhook( url = '' )
    {
        this.url = url;
        this.webhook = new IncomingWebhook(this.url);
    }

    async sendWebhookMessage(text = '') 
    {
        // Send simple text to the webhook channel
        this.webhook.send(text, function (err, res) 
        {
            if (err) 
            {
                console.log('Error:', err);
            }
            else 
            {
                //console.log('Message sent: ', res);
            }
        });
    }

    async establishWebClient(token = '')
    {
        this.token = token;
        this.web = new WebClient(this.token);
    }

    async sendWebClientMessage(to = '', text = '' , attach = {}) 
    {
        this.web.chat.postMessage(to, text, attach)
            .then((res) => 
            {
                // `res` contains information about the posted message
                console.log('Message sent: ', res.ts);
            })
            .catch(console.error);
    }
}

module.exports = SlackApiHelper;
