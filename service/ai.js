require('dotenv').config();

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function openAiMessage(prompt) {
  try {
    const { data } = await openai.createCompletion({
      model: process.env.OPEN_AI_GPT_MODEL,
      prompt,
      max_tokens: 100,
      temperature: 0,
      logprobs: 3,
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
