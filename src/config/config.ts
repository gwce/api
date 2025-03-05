import dotenv from "dotenv";
dotenv.config();

const OPENAI_API_KEY = process.env["OPENAI_API_KEY"];
const OPENAI_API_MODEL = process.env["OPENAI_API_MODEL"];

const config = {
  openAIKey: OPENAI_API_KEY,
  model: OPENAI_API_MODEL
};

export default config;
