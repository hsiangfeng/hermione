const { DISCORD_CHANNEL_MAX_MESSAGE } = require('../config');

const { aiAssistant } = require('../apis');

const { replyMessage, errorMessage } = require('../data/message');

async function channelMessage(message) {
  let cacheMsg = null;
  try {
    cacheMsg = await message.channel.send(replyMessage);

    let prompt = '';
    if (DISCORD_CHANNEL_MAX_MESSAGE === 1) {
      prompt = message.content;
    } else {
      const channelMessageData = await message.channel
        .messages.fetch({
          limit: DISCORD_CHANNEL_MAX_MESSAGE + 1,
        });
      const channelMessageDataArray = channelMessageData.map((msg) => msg.content);
      prompt = channelMessageDataArray
        .reverse()
        .filter((msg) => msg !== replyMessage && msg !== '')
        .join('\n');
    }

    const text = await aiAssistant(prompt);

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
