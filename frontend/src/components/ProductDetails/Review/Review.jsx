import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import PropTypes from "prop-types";
import "./Review.css";
import { useEffect, useState } from "react";
import { message } from "antd";

const Review = ({ active, product, setProduct }) => {
  const [users, setUsers] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const thisReview = [];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users`);

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          message.error("Failed to fetch data.");
        }
      } catch (error) {
        console.log("Data fetch error:", error);
      }
    };
    fetchUsers();
  }, [apiUrl]);

  product.reviews.forEach((review) => {
    const matchingUsers = users?.filter((user) => user._id === review.user);

    matchingUsers.forEach((matchingUser) => {
      thisReview.push({
        review: review,
        user: matchingUser,
      });
    });
  });

  return (
    <div className={`tab-panel-reviews ${active}`}>
      {product.reviews.length > 0 ? (
        <>
          <h3>{`${product.reviews.length} reviews for ${product.name}`}</h3>
          <div className="comments">
            <ol className="comment-list">
              {thisReview.map((item, index) => (
                <ReviewItem key={index} item={item} reviewItem={item} />
              ))}
            </ol>
          </div>
        </>
      ) : (
        <h3>No reviews yet...</h3>
      )}

      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewForm
          product={product}
          setProduct={setProduct}
        />
      </div>
    </div>
  );
};

export default Review;

Review.propTypes = {
  active: PropTypes.string,
  product: PropTypes.object,
  setProduct: PropTypes.func,
};
