const { MAX_TEXT_LENGTH } = require('../config');

const { aiAssistant } = require('../apis');

const {
  replyMessage,
  sendMaxLengthMessage,
  errorMessage,
} = require('../data/message');

async function forumMessage(message) {
  let cacheMessages = null;
  try {
    cacheMessages = await message.channel.send(replyMessage);
    const forumsMessages = await message.channel.messages.fetch();

    const filterMessages = forumsMessages
      .reverse()
      .filter((msg) => msg.content
      && msg.content !== replyMessage
      && msg.content !== sendMaxLengthMessage(MAX_TEXT_LENGTH));

    const prompt = filterMessages.map((msg) => msg.content).join('\n');

    if (prompt.length > MAX_TEXT_LENGTH) {
      await cacheMessages.delete();
      message.channel.send(sendMaxLengthMessage(MAX_TEXT_LENGTH));
      return;
    }

    const text = await aiAssistant(prompt);

    await cacheMessages.delete();

    message.reply(text);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    await cacheMessages.delete();

    message.reply(errorMessage({
      status: error.response.status,
      statusText: error.response.statusText,
    }));
  }
}

module.exports = forumMessage;
