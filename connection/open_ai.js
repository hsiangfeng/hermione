const { Configuration, OpenAIApi } = require('openai');

const { OPEN_AI_API_KEY } = require('../config');

const configuration = new Configuration({
  apiKey: OPEN_AI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

module.exports = openAI;
