const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');

const {
  PORT,
  DISCORD_FORUM_ID,
  DISCORD_BOT_TOKEN,
  DISCORD_CHANNEL_ID,
} = require('./config');

const forums = require('./src/forums');
const channel = require('./src/channel');

const app = express();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once('ready', (c) => {
  // eslint-disable-next-line no-console
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('messageCreate', async (msg) => {
  if (msg.author?.bot) return;

  if (msg.channel.parentId === DISCORD_FORUM_ID) {
    forums(msg);
  }

  if (msg.channel.id === DISCORD_CHANNEL_ID) {
    channel(msg);
  }
});

client.login(DISCORD_BOT_TOKEN);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on ${PORT}`);
});
