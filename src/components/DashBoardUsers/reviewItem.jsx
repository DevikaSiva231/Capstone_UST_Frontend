import { useState } from "react";

const ReviewItem = ({ review }) => {
    const [showFullText, setShowFullText] = useState(false);
    const characterLimit = 100; // Limit for the initial display of the review content
  
    const toggleShowFullText = () => {
      setShowFullText(!showFullText);
    };
  
    return (
      <div className="min-w-[300px] p-4 bg-black/50 backdrop-blur-md rounded-lg shadow-md">
        <p className="text-gold font-semibold">{review.user_name}</p>
        <p className="text-gold mb-2">
          {showFullText || review.content.length <= characterLimit
            ? review.content
            : `${review.content.slice(0, characterLimit)}...`}
          {review.content.length > characterLimit && (
            <span
              className="text-gold cursor-pointer underline ml-2"
              onClick={toggleShowFullText}
            >
              {showFullText ? "Show less" : "Read more"}
            </span>
          )}
        </p>
        <small className="text-gold">
          {new Date(review.created_at).toLocaleString()}
        </small>
      </div>
    );
  };
  

export default ReviewItem;