require('dotenv').config();

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

async function openAiMessage(prompt) {
  try {
    const { data } = await openAI.createCompletion({
      model: process.env.OPEN_AI_GPT_MODEL || 'text-curie-001',
      prompt,
      max_tokens: process.env.OPEN_AI_MAX_TOKENS || 100,
      temperature: 0,
      logprobs: 3,
    });
    const [choices] = data.choices;

    return choices.text.trim();
  } catch (error) {
    // eslint-disable-next-line no-console
    // console.error(error);
    return `對不起，我發生 **${error.response.status} - ${error.response.statusText}** 錯誤，所以不知道該怎麼回你 QQ`;
  }
}

module.exports = {
  openAiMessage,
};
