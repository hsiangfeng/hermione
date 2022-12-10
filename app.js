require('dotenv').config();
const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
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

  if (msg.channel.parentId === process.env.DISCORD_CHANNEL_ID) {
    forums(msg);
  }

  if (msg.channel.id === '998519203399208981') {
    channel(msg);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on ${port}`);
});
