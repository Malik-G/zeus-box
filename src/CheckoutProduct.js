import React from 'react'
import { useStateValue } from './StateProvider';
import "./CheckoutProduct.css"

function CheckoutProduct({ id, title, price, rating, image, page }) {
  const [{ cart }, dispatch] = useStateValue();

  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id
    });
  }

  return (
    <div className="checkout-product">
      <img className="checkout-product-img" src={image} alt="" />
      <div className="checkout-product-info">
        <p>{title}</p>
        <p className="checkout-product-price">
          <small>$</small><strong>{price}</strong>
        </p>
        <div className="checkout-product-rating">
          {rating > 0 ? Array(rating).fill().map((_, i) =>
            (<span className="star" role="img">&#11088;</span>)) : <></>
          }
        </div>
        {page !== 'orders' ?
          <button onClick={removeFromCart}>Remove from Cart</button>
          :
          <></>
        }
      </div>
    </div>
  )
}

export default CheckoutProduct
