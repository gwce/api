import OpenAI from 'openai';
import config from "../config/config";
import logging from "../config/logging";

const openai = new OpenAI({
  apiKey: config.openAIKey
});

const generateResponse = async (request: string) => {

  logging.debug("OpenAI", "Generating response");

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [
      {
        role: 'user',
        content: `${request}`
      },
      {
        role:'system',
        content: 'You are a useful chat assistant.'
      }
    ],
    max_tokens: 100,
    model: 'gpt-3.5-turbo',
  };
  const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
  return chatCompletion.choices[0].message.content;
}

module.exports = { generateResponse }