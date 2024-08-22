import Card from "../../../components/ui/Card/Card";
import "./DisplayFetchedMetadata.css";

const DisplayFetchedMetadata = ({ fetchedMetadatas }) => {
  return (
    <>
      <div className="metadataCards">
        {fetchedMetadatas.map((metadata, index) => (
          <div>
            <Card
              key={index}
              title={metadata.title}
              description={metadata.description}
              image={metadata.image}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayFetchedMetadata;
