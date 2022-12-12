const { MAX_TEXT_LENGTH } = require('../config');

const { openAiMessage } = require('./service/ai');

async function index(msg) {
  let tempMsg = null;
  try {
    const replyMessage = '等我一下，我正在想要怎麼回覆你...';
    tempMsg = await msg.channel.send(replyMessage);

    const forums = await msg.channel.messages.fetch();

    forums.reverse();

    const sendMaxLengthMessage = `對不起 >_< 這個貼文內容已經超過 **${MAX_TEXT_LENGTH}** 字了！\n所以我無法在繼續回覆你了...\n建議你另外開啟新貼文唷~`;

    let tempContent = '';
    forums.forEach((forum) => {
      if (forum.content === replyMessage) return;
      if (!forum.content) return;
      if (forum.content === sendMaxLengthMessage) return;

      tempContent += `${forum.content}\n`;
    });

    if (tempContent.length > MAX_TEXT_LENGTH) {
      await tempMsg.delete();
      await msg.channel.send(sendMaxLengthMessage);
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
}

module.exports = index;
