import { Star } from "lucide-react";

const StarRating = ({ rate }) => {
  return (
    <div className="star-rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          fill={index < rate ? "gold" : "none"}
          color={index < rate ? "gold" : "gray"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
};

export default StarRating;
