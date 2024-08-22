import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { fetchMetaDataFromUrls } from "./controllers/urlController.js";

const app = express();

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 1000,
  max: 5,
  message: "Too many requests, please try again later.",
});

const handler = allowCors(async (req, res) => {
  if (req.method === "POST") {
    return fetchMetaDataFromUrls(req, res);
  }
  res.status(405).end();
});

app.post("/fetch-metadata", limiter, handler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
