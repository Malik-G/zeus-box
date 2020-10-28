import React, { useEffect, useRef, useState } from 'react'
import { useStateValue } from "./StateProvider"
import CheckoutProduct from "./CheckoutProduct"
import { getCartTotal } from "./reducer";
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { db } from './firebase';
import CurrencyFormat from 'react-currency-format';
import axios from './axios';
import swal from "sweetalert";
import "./Payment.css"

function Payment() {
  const [{ cart, user }, dispatch] = useStateValue();
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(
      clientSecret,
      { payment_method: { card: elements.getElement(CardElement) } }
    )
      .then(({ paymentIntent }) => {
        db.collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
            cart: cart,
            amount: paymentIntent.amount,
            created: paymentIntent.created
          })
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_CART"
        })
        history.replace("/orders");
      })
  }

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "")
  }

  useEffect(() => {
    swal("Use This Test Data:", "Card Number: 4242 4242 4242 4242 \n\nExpiration: 04/24 \n\nCVC: 242 \n\nPostal: 42424", "info")
    //generate new stripe secret whenever total cost changes, i.e. when the cart updates
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        // * 100 because stripe converts from your chosen currency's subunit, e.g. dollars -> cents
        url: `/payments/create?total=${getCartTotal(cart) * 100}`
      });
      setClientSecret(response.data.clientSecret);
    }
    getClientSecret();

  }, [cart])

  return (
    <div className="payment">
      <div className="payment-container">
        <h1 className="cart-link">Checkout (<Link to="/checkout">{cart?.length}</Link>)</h1>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-address">
            <p>{user?.email}</p>
            <p>132 Direct Street</p>
            <p>St. Paul, MN, 55000</p>
          </div>
        </div>

        <div className="payment-section">
          <div className="payment-title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment-items">
            {cart.map(item =>
              <CheckoutProduct
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image} />
            )}
          </div>
        </div>

        <div className="payment-section">
          <div className="payment-title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment-details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange}/>
              <div className="payment-price-container">
                <CurrencyFormat
                  renderText={(value) => (
                    <h3 className="order-total">Order Total: {value}</h3>
                  )}
                  decimalScale={2}
                  value={getCartTotal(cart)}
                  displayType={"text"}
                  thousandSeperator={true}
                  prefix={"$"}
                />
                <button className="payment-button" disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
