const wa = require('@open-wa/wa-automate');
const axios = require('axios');
const url = `https://api.rootnet.in/covid19-in/stats/latest`;

wa.create().then(client => start(client));

function start(client) {
  axios.get(url).then((res) => {
    const summary = res.data.data.summary;
    client.onMessage(async message => {
      if (message.body === 'Hi') {
        await client.sendText(message.from, `Hi, \n\n Confirmed *${summary.total}* 🏥 \nDeaths *${summary.deaths}* 🏴‍☠️\nRecovered *${summary.discharged}* 🥳`);
      }
    });
  });
}