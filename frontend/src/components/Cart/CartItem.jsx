import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";

const CartItem = ({ cartItem }) => {
  const { removeFromCart } = useContext(CartContext);

  const currentPrice = (cartItem.price && typeof cartItem.price === 'number') ? cartItem.price : (cartItem.price && typeof cartItem.price.current === 'number' ? cartItem.price.current : 0);
  const quantity = typeof cartItem.quantity === 'number' ? cartItem.quantity : 1;

  if (!cartItem || typeof currentPrice !== 'number' || typeof quantity !== 'number') {
    return null;
  }

  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        <img src={cartItem.img[0]} alt={cartItem.name} />
        <i
          className="bi bi-x delete-cart"
          onClick={() => removeFromCart(cartItem._id)}
        ></i>
      </td>
      <td>{cartItem.name}</td>
      <td>${currentPrice.toFixed(2)}</td>
      <td className="product-quantity">{quantity}</td>
      <td className="product-subtotal">
        ${(currentPrice * quantity).toFixed(2)}
      </td>
    </tr>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    img: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    price: PropTypes.oneOfType([
      PropTypes.shape({
        current: PropTypes.number.isRequired,
      }),
      PropTypes.number,
    ]).isRequired,
    originalPrice: PropTypes.oneOfType([
      PropTypes.shape({
        current: PropTypes.number.isRequired,
      }),
      PropTypes.number,
    ]),
    quantity: PropTypes.number,
  }).isRequired,
};

export default CartItem;
