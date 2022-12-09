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
  // eslint-disable-next-line no-console
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('messageCreate', async (msg) => {
  if (msg.author?.bot) return;
  if (msg.channel.parentId !== process.env.DISCORD_CHANNEL_ID) return;

  let tempMsg = null;
  try {
    const replyMessage = '等我一下，我正在想要怎麼回覆你...';
    tempMsg = await msg.channel.send(replyMessage);

    const forums = await msg.channel.messages.fetch();

    forums.reverse();

    let tempContent = '';
    forums.forEach((forum) => {
      if (forum.content === replyMessage) return;
      tempContent += `${forum.content}\n`;
    });

    const maxTextLength = process.env.MAX_TEXT_LENGTH || 1000;

    if (tempContent.length > maxTextLength) {
      await tempMsg.delete();
      await msg.channel.send(`對不起 >_< 這個貼文內容已經超過 **${maxTextLength}** 字了！\n所以我無法在繼續回覆你了...\n建議你另外開啟新貼文唷~`);
      return;
    }

    const text = await openAiMessage(tempContent);

    await tempMsg.delete();

    await msg.reply(text);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    await tempMsg.delete();
    await msg.reply('對不起，我發生了不知名錯誤，所以沒辦法回覆你 QQ');
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
