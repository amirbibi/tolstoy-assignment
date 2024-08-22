import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { fetchMetaDataFromUrls } from "./src/controllers/urlController.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 1000,
  max: 5,
  message: "Too many requests, please try again later.",
});

app.post("/fetch-metadata", limiter, fetchMetaDataFromUrls);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
