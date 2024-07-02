import { useState } from "react";
import { TiStarFullOutline , TiStarHalfOutline } from "react-icons/ti";
const RenderRating = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (index) => {
    onRatingChange(index + 1);
  };

  const handleMouseEnter = (index) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const renderStar = (i) => {
    const filled = hoverRating > i || rating > i;
    const halfFilled = (hoverRating || rating) === i + 0.5;

    if (halfFilled) {
      return <TiStarHalfOutline key={i} className="text-yellow-300 h-5 w-5 cursor-pointer" />;
    }

    return (
      <TiStarFullOutline
        key={i}
        className={`h-5 w-5 cursor-pointer ${filled ? "text-yellow-300" : "text-gray-300"}`}
      />
    );
  };

  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <div
        key={i}
        onClick={() => handleClick(i)}
        onMouseEnter={() => handleMouseEnter(i)}
        onMouseLeave={handleMouseLeave}
      >
        {renderStar(i)}
      </div>
    );
  }

  return <div className="flex">{stars}</div>;
};

export default RenderRating;
