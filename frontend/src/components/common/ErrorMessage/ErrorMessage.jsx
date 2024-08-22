import "./ErrorMessage.css";

const ErrorMessage = ({ error }) => {
  return <p className="error">{error}</p>;
};

export default ErrorMessage;
