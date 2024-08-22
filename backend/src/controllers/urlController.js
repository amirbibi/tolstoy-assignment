import https from "https";

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const fetchMetaDataFromUrls = async (req, res) => {
  const { urls } = req.body;

  if (!Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: "Invalid or empty URL array" });
  }

  const invalidUrls = urls.filter((url) => !isValidUrl(url));
  if (invalidUrls.length > 0) {
    return res
      .status(400)
      .json({ error: "Invalid URL(s) provided", invalidUrls });
  }

  try {
    const metadataResults = await Promise.all(
      urls.map((url) =>
        fetchMetadata(url).catch((error) => ({ error: error.message }))
      )
    );
    res.json({ metadata: metadataResults });
  } catch (error) {
    console.error("Metadata fetch error:", error);
    res.status(500).json({ error: "Failed to fetch metadata" });
  }
};

const fetchMetadata = (url) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(
            new Error(
              `HTTP error while trying to get the metadata from the URL! status: ${res.statusCode}`
            )
          );
          return;
        }

        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          const metadata = {
            title: data.match(/<title>(.*?)<\/title>/is)?.[1]?.trim() || "",
            description:
              data.match(
                /<meta\s+name="description"\s+content="(.*?)"/is
              )?.[1] || "",
            image:
              data.match(
                /<meta\s+property="og:image"\s+content="(.*?)"/is
              )?.[1] || "",
          };
          resolve(metadata);
        });
      })
      .on("error", reject);
  });
};
