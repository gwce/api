import dotenv from "dotenv";
import { url } from "inspector";
dotenv.config();

const OPENAI_API_KEY = process.env["OPENAI_API_KEY"];
const OPENAI_API_MODEL = process.env["OPENAI_API_MODEL"];
const OPENAI_URL = process.env["OPENAI_URL"] || "https://api.openai.com/v1/chat/completions";
const API_KEY = '3lKzAzauWMGQ1BGUBogcEGMl0cDyDUHJhpecveDJejw85HHaqb91Ez5L9moDXbrI';

const config = {
  openAIKey: OPENAI_API_KEY,
  model: OPENAI_API_MODEL,
  url: OPENAI_URL,
  api_key: API_KEY,
};

export default config;
