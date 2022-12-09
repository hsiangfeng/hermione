require('dotenv').config();

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

async function openAiMessage(prompt) {
  try {
    const { data } = await openAI.createCompletion({
      model: process.env.OPEN_AI_GPT_MODEL,
      prompt,
      max_tokens: process.env.OPEN_AI_MAX_TOKENS,
      temperature: 0,
    });
    const [choices] = data.choices;

    return choices.text.trim();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return 'oh！no！我不知道怎麼回覆你。';
  }
}

module.exports = {
  openAiMessage,
};
