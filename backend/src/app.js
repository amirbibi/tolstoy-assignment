import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { fetchMetaDataFromUrls } from "./controllers/urlController.js";

const app = express();

app.use(
  cors({
    origin: [
      "https://tolstoy-assignment-3j6lgsewm-amirs-projects-06b8a9b4.vercel.app",
      "https://tolstoy-assignment-ekmbqa9q9-amirs-projects-06b8a9b4.vercel.app",
    ],
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false,
  })
);

app.use(express.json());

const limiter = rateLimit({
  windowMs: 1000,
  max: 5,
  message: "Too many requests, please try again later.",
});

app.post("/fetch-metadata", limiter, fetchMetaDataFromUrls);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
