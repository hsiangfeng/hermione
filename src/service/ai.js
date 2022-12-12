const { Configuration, OpenAIApi } = require('openai');

const {
  OPEN_AI_API_KEY,
  OPEN_AI_MAX_TOKENS,
  OPEN_AI_GPT_MODEL,
} = require('../../config');

const configuration = new Configuration({
  apiKey: OPEN_AI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

async function openAiMessage(prompt) {
  try {
    const { data } = await openAI.createCompletion({
      model: OPEN_AI_GPT_MODEL,
      prompt,
      max_tokens: Number(OPEN_AI_MAX_TOKENS),
      temperature: 0,
      logprobs: 3,
    });
    const [choices] = data.choices;

    return choices.text.trim() || '抱歉，我沒有話可說了。';
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return `對不起，我發生 **${error.response.status} - ${error.response.statusText}** 錯誤，所以不知道該怎麼回你 QQ`;
  }
}

module.exports = {
  openAiMessage,
};
