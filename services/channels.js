const { DISCORD_CHANNEL_MAX_MESSAGE } = require('../config');

const { aiAssistant } = require('../apis');

const { replyMessage, errorMessage } = require('../data/message');

async function channelMessage(message) {
  let cacheMsg = null;
  try {
    cacheMsg = await message.channel.send(replyMessage);

    const channelMessageData = await message.channel.messages.fetch();
    const channelMessageDataArray = channelMessageData.map((msg) => msg.content);

    const prompt = channelMessageDataArray
      .slice(0, DISCORD_CHANNEL_MAX_MESSAGE)
      .filter((msg) => msg !== replyMessage && msg !== '')
      .reverse()
      .join('\n');

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
