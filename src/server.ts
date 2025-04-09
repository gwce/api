import express, { Express, Request, Response } from "express";
import logging from "./config/logging";
import config from "./config/config";
const { generateResponse } = require("./controllers/openAIController");
const namespace = "SERVER";
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(404).send("Not Found");
});

/**
 * @description This endpoint is used to generate a response from the OpenAI API.
 * @param {string} title The title of the question.
 */
app.post("/ai", async (req: Request, res: Response) => {
  const title = req.body.title as string;
  const key = req.header('X-API-Key');
  if (key === config.api_key) {
    if (!title) {
      return res.status(400).send({
        ok: false,
        error: "Please provide a title",
      });
    }
  
    logging.debug(namespace, title);
  
    const response = await generateResponse(title);
    res.send(sanitizeResponse(response));
  } else {
    res.sendStatus(401);
  }
});

app.get('/auth', (req, res) => {
  const key = req.header('X-API-Key');
  if (key === config.api_key) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.listen(port, () => {
  logging.info(namespace, `[server]: Server is running at http://localhost:${port}`);
});

function sanitizeResponse(response: string): string {
  logging.debug(namespace, response.replace("```", "").replace("```", "").replace("json", ""));
  return response.replace("```", "").replace("```", "").replace("json", "");
}

//curl -H 'Content-Type: application/json' -d '{ "title":"What is the capital of New Zealand"}' -X POST https://localhost:3334/openai