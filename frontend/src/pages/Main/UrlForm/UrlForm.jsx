import UrlInputForm from "./UrlInputForm/UrlInputForm";
import "./UrlForm.css";
import ErrorMessage from "../../../components/common/ErrorMessage/ErrorMessage";

const UrlForm = ({ urls, setUrls, onSubmit, error }) => {
  const handleAddUrl = () => {
    setUrls((prevUrls) => {
      return [...prevUrls, ""];
    });
  };

  const handleRemoveUrl = (index) => {
    setUrls((prevUrls) => {
      const newUrls = [...prevUrls];
      newUrls.splice(index, 1);
      return newUrls;
    });
  };

  const onChange = (e, index) => {
    const { value } = e.target;

    const newUrls = [...urls];
    newUrls[index - 1] = value;
    setUrls(newUrls);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Add URLs</h2>
      {urls.map((url, index) => (
        <div key={index} className="inputGroup">
          <UrlInputForm
            index={index + 1}
            isRequired={true}
            onChange={onChange}
          />
          {index >= 3 && (
            <button type="button" onClick={() => handleRemoveUrl(index)}>
              Delete
            </button>
          )}
        </div>
      ))}

      <button type="button" className="addUrlButton" onClick={handleAddUrl}>
        Add URL
      </button>
      <button type="submit" className="submitButton">
        Submit URLs
      </button>
      {error && <ErrorMessage error={error} />}
    </form>
  );
};

export default UrlForm;
