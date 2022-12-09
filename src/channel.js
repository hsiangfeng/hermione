const { openAiMessage } = require('./service/ai');

async function index(msg) {
  let tempMsg = null;
  try {
    const replyMessage = '等我一下，我正在想要怎麼回覆你...';
    tempMsg = await msg.channel.send(replyMessage);

    const text = await openAiMessage(msg.content);

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
