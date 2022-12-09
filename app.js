require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const { openAiMessage } = require('./service/ai');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once('ready', (c) => {
  // c.user.setStatus('dnd');

  c.user.setActivity('六角學院帶你學到會！', {
    type: 'WATCHING',
    url: 'https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA',
  });

  // eslint-disable-next-line no-console
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('messageCreate', async (msg) => {
  if (msg.author?.bot) return;
  if (msg.channel.parentId !== process.env.DISCORD_CHANNEL_ID) return;
  let tempMsg = null;

  try {
    // reply loading message
    const replyMessage = '等我一下，我正在想要怎麼回覆你...';
    tempMsg = await msg.channel.send(replyMessage);
    let tempContent = '';
    const forums = await msg.channel.messages.fetch();
    // reverse forums
    forums.reverse();

    forums.forEach((forum) => {
      if (forum.content === replyMessage) return;
      tempContent += `${forum.content}\n`;
    });

    const count = 1500;
    if (tempContent.length > count) {
      await tempMsg.delete();
      await msg.channel.send(`對不起 >_< 這個論壇內容已經超過 **${count}** 字了！\n所以我無法在繼續回覆你了...\n建議你另外開啟論壇唷~`);
      return;
    }

    const text = await openAiMessage(tempContent);

    await tempMsg.delete();

    await msg.reply(text);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    await tempMsg.delete();
    await msg.reply('對不起，我發生錯誤了，所以不知道該怎麼回你 QQ');
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
