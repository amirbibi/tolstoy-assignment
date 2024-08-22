import { jest } from "@jest/globals";
import request from "supertest";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Mock the fetchMetaDataFromUrls function
const mockFetchMetaDataFromUrls = jest.fn((req, res) => {
  res.json({
    metadata: [
      {
        title: "Test Title",
        description: "Test Description",
        image: "https://test.com/image.jpg",
      },
    ],
  });
});

jest.mock("./controllers/urlController.js", () => ({
  fetchMetaDataFromUrls: mockFetchMetaDataFromUrls,
}));

describe("Server Configuration", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(helmet());
    app.use(cors({ origin: "http://localhost:3000" }));
    app.use(express.json());

    const limiter = rateLimit({
      windowMs: 1000,
      max: 5,
      message: "Too many requests, please try again later.",
    });

    app.post("/fetch-metadata", limiter, mockFetchMetaDataFromUrls);
  });

  it("should respond with 200 and correct data for a valid request", async () => {
    const response = await request(app)
      .post("/fetch-metadata")
      .send({
        urls: [
          "https://example.com",
          "https://example.com",
          "https://example.com",
        ],
      })
      .set("Origin", "http://localhost:3000");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("metadata");
    expect(Array.isArray(response.body.metadata)).toBe(true);
    expect(response.body.metadata.length).toBe(1);
    expect(response.body.metadata[0]).toHaveProperty("title");
    expect(response.body.metadata[0]).toHaveProperty("description");
    expect(response.body.metadata[0]).toHaveProperty("image");
  });

  it("should respond with 429 when rate limit is exceeded", async () => {
    for (let i = 0; i < 5; i++) {
      await request(app)
        .post("/fetch-metadata")
        .send({ urls: ["https://example.com"] })
        .set("Origin", "http://localhost:3000");
    }

    const response = await request(app)
      .post("/fetch-metadata")
      .send({ urls: ["https://example.com"] })
      .set("Origin", "http://localhost:3000");

    expect(response.statusCode).toBe(429);
    expect(response.text).toBe("Too many requests, please try again later.");
  });
});
