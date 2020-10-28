import React from 'react'
import Subtotal from "./Subtotal"
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider';
import "./Checkout.css"

function Checkout() {
  const [{ cart, user }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout-left">
        <div >
          <h1 className="checkout-title">Your Cart</h1>
        </div>
        {cart.map(item =>
          <CheckoutProduct
            id={item.id}
            title={item.title}
            price={item.price}
            rating={item.rating}
            image={item.image} />)
        }
      </div>
      <div className="checkout-right">
        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout
