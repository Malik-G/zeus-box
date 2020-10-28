import React, { useEffect, useState } from "react"
import { db } from "./firebase"
import { useStateValue } from "./StateProvider";
import LoginMessage from "./LoginMessage";
import SingleOrder from "./SingleOrder";
import "./Orders.css"

function Orders() {
  const [{ cart, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user && user !== 'guest') {
      db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => {
          setOrders(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          })))
        })
    }
    else {
      setOrders([])
    }
  }, [user])


  return (
    <div className="orders">
      <h1 className="orders-title">Past Orders</h1>
      {!user ?
        <></>
        :
        user === 'guest' ?
        <div className="message-container">
            <LoginMessage
            messageClass="login-message-light"
            messageContent={"orders"}
            />
        </div>
        
        :
        <div className="orders_order">
          {orders?.map(o =>
            <SingleOrder order={o} />
          )}
        </div>
      }

    </div>
  )
}

export default Orders
