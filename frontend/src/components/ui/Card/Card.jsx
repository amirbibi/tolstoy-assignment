import "./Card.css";

const Card = ({ title, description, image }) => {
  return (
    <div className="card">
      <h1>{title}</h1>
      <p>{description}</p>
      <img src={image} alt="metadata-image" width={100} />
    </div>
  );
};

export default Card;
