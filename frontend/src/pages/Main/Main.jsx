import DisplayFetchedMetadata from "./DisplayFetchedMetadata/DisplayFetchedMetadata";
import UrlForm from "./UrlForm/UrlForm";
import "./Main.css";
import { useState } from "react";

const Main = () => {
  const [urls, setUrls] = useState(["", "", ""]);
  const [fetchedMetadatas, setFetchedMetadatas] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(
        "https://tolstoy-assignment-gmpxy6u22-amirs-projects-06b8a9b4.vercel.app/fetch-metadata",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ urls }),
        }
      );

      // Checks for HTTP error responses (404, 500 etc.)
      if (!response.ok) {
        console.error("Failed to send URLs to the backend");
        setError("Failed to send URLs to the backend");
      }

      const data = await response.json();
      console.log(data.metadata);
      setFetchedMetadatas(data.metadata);
    } catch (error) {
      // Handles network errors or JSON parsing failures
      console.error("Failed to send URLs to the backend", error);
      setError("Failed to send URLs to the backend");
    }
  };

  return (
    <div className="Main">
      <UrlForm
        onSubmit={onSubmit}
        urls={urls}
        setUrls={setUrls}
        error={error}
      />
      {fetchedMetadatas && (
        <DisplayFetchedMetadata fetchedMetadatas={fetchedMetadatas} />
      )}
    </div>
  );
};

export default Main;
