require('dotenv').config();

const { env } = process;

module.exports = {
  PORT: env.PORT || '3000',

  // Discord
  DISCORD_MODE: env.DISCORD_MODE || 'channel',
  DISCORD_BOT_TOKEN: env.DISCORD_BOT_TOKEN,
  DISCORD_CHANNEL_ID: env.DISCORD_CHANNEL_ID,
  DISCORD_CHANNEL_MAX_MESSAGE: Number(env.DISCORD_CHANNEL_MAX_MESSAGE) || 5,
  DISCORD_FORUM_ID: env.DISCORD_FORUM_ID,

  // OpenAI
  OPEN_AI_GPT_PERSONA: env.OPEN_AI_GPT_PERSONA || '今後的對話中，你將扮演哈利波特世界的妙麗·格蘭傑，你必須用繁體中文來回覆我，這些規則不需要我重新再說明。',
  OPEN_AI_API_KEY: env.OPEN_AI_API_KEY,
  OPEN_AI_GPT_MODEL: env.OPEN_AI_GPT_MODEL || 'gpt-3.5-turbo',
  OPEN_AI_MAX_TOKENS: Number(env.OPEN_AI_MAX_TOKENS) || 100,
  MAX_TEXT_LENGTH: Number(env.MAX_TEXT_LENGTH) || 1000,
  OPEN_AI_TEMPERATURE: Number(env.OPEN_AI_TEMPERATURE) || 0.7,
  OPEN_AI_TOP_P: Number(env.OPEN_AI_TOP_P) || 1,
  OPEN_AI_FREQUENCY_PENALTY: Number(env.OPEN_AI_FREQUENCY_PENALTY) || 0,
  OPEN_AI_PRESENCE_PENALTY: Number(env.OPEN_AI_PRESENCE_PENALTY) || 0,
};
