const { MAX_TEXT_LENGTH, OPEN_AI_GPT_PERSONA } = require('../config');

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
    const reverseMessages = forumsMessages.reverse();
    const messages = reverseMessages.map((msg) => {
      if (msg.author.bot) {
        if (msg.content === replyMessage) {
          return null;
        }

        return {
          role: 'system',
          content: msg.content,
        };
      }

      return {
        role: 'user',
        content: msg.content,
      };
    }).filter((msg) => msg !== null);

    // if (messages.length === MAX_TEXT_LENGTH) {
    //   await cacheMessages.delete();
    //   message.channel.send(sendMaxLengthMessage);
    //   return;
    // }

    messages.unshift({
      role: 'user',
      content: OPEN_AI_GPT_PERSONA,
    });

    const text = await aiAssistant(messages);

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
