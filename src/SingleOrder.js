import React from 'react';
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from 'react-currency-format';
import { getCartTotal } from "./reducer";
import { useStateValue } from './StateProvider';
import "./SingleOrder.css";

function SingleOrder({ order }) {
  const [{cart}, dispatch] = useStateValue()
  return (
    <div className="single-order">
      <p className="order-date"><span className="order-detail">Order Date:</span> {moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order-id"><span className="order-detail">Order ID:</span> {order.id}</p>
      {order.data.cart.map(item => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          price={item.price}
          rating={item.rating}
          image={item.image}
          page="orders"
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className = "order-total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeperator={true}
        prefix={"$"}
      />
    </div>
  )
}

export default SingleOrder
