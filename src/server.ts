import express, { Express, Request, Response } from "express";
import logging from "./config/logging";
import config from "./config/config";
const { generateResponse } = require("./controllers/AIController");
const namespace = "SERVER";
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(404);
});

/**
 * This endpoint is used to generate a response from the AI API and to obfuscate the use of the API key.
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
  
    const response = await generateResponse(title, key);
    res.send(sanitizeResponse(response));
  } else {
    res.sendStatus(401);
  }
});

/**
 * This endpoint is used to check if the API key is valid.
 * It is used to authenticate the user before allowing access to the AI endpoint.
 */
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

//curl -H 'Content-Type: application/json' -d '{ "title":"What is the capital of New Zealand"}' -X POST https://ai.tonoli.click/v1

//curl -H 'Content-Type: application/json' -H 'X-API-Key: '  -H "Authorization: Bearer ollama" -d '{"messages":[{"role":"user","content":"What is the capital of New Zealand"}],"max_tokens":2000,"model":"gpt-4o"}' -X POST http://rick:11434/v1/chat/completions
