import "./Review.css";
import ReviewFrom from "./ReviewFrom"; // "ReviewFrom" yerine "ReviewForm" olarak düzeltildi
import ReviewItem from "./ReviewItem";
import PropTypes from "prop-types";

const Review = ({ active }) => {
  return (
    <div className={`tab-panel-reviews ${active}`}>
      <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
      <div className="comments">
        <ol className="comment-list">
          <ReviewItem />
          <ReviewItem />
        </ol>
      </div>
      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewFrom />
      </div>
    </div>
  );
};

Review.propTypes = {
  active: PropTypes.string,
};

export default Review;
