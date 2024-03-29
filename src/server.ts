import express, { Express, Request, Response } from "express";
import logging from "./config/logging";
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
app.post("/openai", async (req: Request, res: Response) => {
  const title = req.body.title as string;

  if (!title) {
    return res.status(400).send({
      ok: false,
      error: "Please provide a title",
    });
  }

  logging.debug(namespace, title);

  const response = await generateResponse(title);
  res.send(response);
});

app.listen(port, () => {
  logging.info(namespace, `[server]: Server is running at http://localhost:${port}`);
});


//curl -H 'Content-Type: application/json' -d '{ "title":"What is the capital of New Zealand"}' -X POST https://localhost:3334/openai