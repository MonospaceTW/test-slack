const SlackApiHelper = require('./../index');
const fs = require('fs');

const contents = fs.readFileSync('config.json');
const jsonContent = JSON.parse(contents);

const token = jsonContent.webclient_token;
const to = '#random';
const slackApiHelper = new SlackApiHelper(token);

test('sendWebClientMessage', async () => {
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
});
