import { jest } from "@jest/globals";
import { fetchMetaDataFromUrls } from "../controllers/urlController.js";

describe("fetchMetaDataFromUrls", () => {
  it("should return 400 for invalid or empty URL array", async () => {
    const req = { body: { urls: [] } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await fetchMetaDataFromUrls(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid or empty URL array",
    });
  });

  it("should return 400 for invalid URLs", async () => {
    const req = { body: { urls: ["not-a-valid-url"] } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await fetchMetaDataFromUrls(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid URL(s) provided",
      invalidUrls: ["not-a-valid-url"],
    });
  });

  it("should fetch metadata for valid URLs", async () => {
    const req = {
      body: {
        urls: [
          "https://example.com",
          "https://example.com",
          "https://example.com",
        ],
      },
    };
    const res = {
      json: jest.fn(),
    };

    await fetchMetaDataFromUrls(req, res);

    expect(res.json).toHaveBeenCalled();
    const result = res.json.mock.calls[0][0];
    expect(result).toHaveProperty("metadata");
    expect(Array.isArray(result.metadata)).toBe(true);
  });
});
