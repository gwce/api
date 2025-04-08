import dotenv from "dotenv";
import { url } from "inspector";
dotenv.config();

const OPENAI_API_KEY = process.env["OPENAI_API_KEY"];
const OPENAI_API_MODEL = process.env["OPENAI_API_MODEL"];
const OPENAI_URL = process.env["OPENAI_URL"] || "https://api.openai.com/v1/chat/completions";

const config = {
  openAIKey: OPENAI_API_KEY,
  model: OPENAI_API_MODEL,
  url: OPENAI_URL,
};

export default config;
