const { DISCORD_CHANNEL_MAX_MESSAGE } = require('../config');

const { aiAssistant } = require('../apis');

const { replyMessage, errorMessage } = require('../data/message');

async function channelMessage(message) {
  let cacheMsg = null;
  try {
    cacheMsg = await message.channel.send(replyMessage);

    let messages = [];
    if (DISCORD_CHANNEL_MAX_MESSAGE === 1) {
      messages.push({
        role: 'user',
        content: message.content,
      });
    } else {
      const channelMessageData = await message.channel
        .messages.fetch({
          limit: DISCORD_CHANNEL_MAX_MESSAGE + 1,
        });
      const reverseMessages = channelMessageData.reverse();
      messages = reverseMessages.map((msg) => {
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
    }

    const text = await aiAssistant(messages);

    await cacheMsg.delete();

    message.reply(text);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    await cacheMsg.delete();

    message.reply(errorMessage({
      status: error.response.status,
      statusText: error.response.statusText,
    }));
  }
}

module.exports = channelMessage;
