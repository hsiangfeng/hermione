const express = require('express');

const {
  PORT,
  DISCORD_BOT_TOKEN,
} = require('./config');

const { discord } = require('./connection');
const { botMessages } = require('./services');

discord.login(DISCORD_BOT_TOKEN);

discord.once('ready', (c) => {
  // eslint-disable-next-line no-console
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

discord.on('messageCreate', async (message) => {
  if (message.author?.bot) return;

  botMessages(message);
});

// 部分伺服器會需要 HTTP Endpoint
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on ${PORT}`);
});
