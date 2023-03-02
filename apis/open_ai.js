const {
  OPEN_AI_MAX_TOKENS,
  OPEN_AI_GPT_MODEL,
  OPEN_AI_TEMPERATURE,
  OPEN_AI_TOP_P,
  OPEN_AI_FREQUENCY_PENALTY,
  OPEN_AI_PRESENCE_PENALTY,
} = require('../config');

const { openAI } = require('../connection');

async function aiAssistant(messages) {
  const { data } = await openAI.createChatCompletion({
    model: OPEN_AI_GPT_MODEL,
    messages,
    max_tokens: OPEN_AI_MAX_TOKENS,
    temperature: OPEN_AI_TEMPERATURE,
    top_p: OPEN_AI_TOP_P,
    frequency_penalty: OPEN_AI_FREQUENCY_PENALTY,
    presence_penalty: OPEN_AI_PRESENCE_PENALTY,
  });

  const [choices] = data.choices;

  return choices.message.content || '抱歉，我沒有話可說了。';
}

module.exports = aiAssistant;
