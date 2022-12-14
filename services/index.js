const {
  DISCORD_MODE,
  DISCORD_FORUM_ID,
  DISCORD_CHANNEL_ID,
} = require('../config');

const forumMessage = require('./forums');
const channelMessage = require('./channels');

function botMessages(message) {
  // eslint-disable-next-line no-console
  console.log(`「${message.channel.name}」${message.author.username}：${message.content} `);

  if (DISCORD_MODE === 'channel') {
    channelMessage(message);
  }

  if (DISCORD_MODE === 'forum') {
    forumMessage(message);
  }

  if (DISCORD_MODE === 'all') {
    if (message.channel.parentId === DISCORD_FORUM_ID) {
      forumMessage(message);
    }

    if (message.channel.id === DISCORD_CHANNEL_ID) {
      channelMessage(message);
    }
  }
}

module.exports = {
  botMessages,
};
