import OpenAI from 'openai';
import config from "../config/config";
import logging from "../config/logging";

const namespace = "OPENAI_CONTROLLER";

const openai = new OpenAI({
  baseURL: config.url,
  apiKey: config.openAIKey,
});

const generateResponse = async (request: string) => {

  logging.debug(namespace, "Generating response from " + config.url);

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [
      {
        role: 'user',
        content: `${request}`
      }
    ],
    max_tokens: 2000,
    model: config.model || 'gpt-4o',
  };
  const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
  return chatCompletion.choices[0].message.content;
}

module.exports = { generateResponse }
