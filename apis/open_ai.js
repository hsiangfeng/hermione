const {
  OPEN_AI_MAX_TOKENS,
  OPEN_AI_GPT_MODEL,
  OPEN_AI_TEMPERATURE,
  OPEN_AI_TOP_P,
  OPEN_AI_FREQUENCY_PENALTY,
  OPEN_AI_PRESENCE_PENALTY,
} = require('../config');

const { openAI } = require('../connection');

async function aiAssistant(prompt) {
  const { data } = await openAI.createCompletion({
    model: OPEN_AI_GPT_MODEL,
    prompt,
    max_tokens: OPEN_AI_MAX_TOKENS,
    temperature: OPEN_AI_TEMPERATURE,
    top_p: OPEN_AI_TOP_P,
    frequency_penalty: OPEN_AI_FREQUENCY_PENALTY,
    presence_penalty: OPEN_AI_PRESENCE_PENALTY,
  });
  const [choices] = data.choices;

  return choices.text.trim() || '抱歉，我沒有話可說了。';
}

module.exports = aiAssistant;
