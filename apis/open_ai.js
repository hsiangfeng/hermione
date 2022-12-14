const {
  OPEN_AI_MAX_TOKENS,
  OPEN_AI_GPT_MODEL,
} = require('../config');

const { openAI } = require('../connection');

async function aiAssistant(prompt) {
  const { data } = await openAI.createCompletion({
    model: OPEN_AI_GPT_MODEL,
    prompt,
    max_tokens: Number(OPEN_AI_MAX_TOKENS),
  });
  const [choices] = data.choices;

  return choices.text.trim() || '抱歉，我沒有話可說了。';
}

module.exports = aiAssistant;
