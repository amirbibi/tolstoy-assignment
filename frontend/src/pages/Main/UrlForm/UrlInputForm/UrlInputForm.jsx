import "./UrlInputForm.css";

const UrlInputForm = ({ index, isRequired, onChange }) => {
  return (
    <div>
      <label htmlFor={`url-${index}`}>URL {index}</label>
      <input
        id={`url-${index}`}
        type="url"
        palceholder="https://example.com"
        required={isRequired}
        onChange={(e) => onChange(e, index)}
      />
    </div>
  );
};

export default UrlInputForm;
