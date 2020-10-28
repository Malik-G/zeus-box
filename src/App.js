import React, { useEffect } from "react";
import Header from "./Header"
import Home from "./Home"
import Checkout from "./Checkout"
import Payment from "./Payment"
import Login from "./Login";
import Store from "./Store"
import Orders from "./Orders";
import Profile from "./Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import {stripe_key} from "./apiKeys"
import "./App.css";

const promise = loadStripe(stripe_key);

function App() {
  const [ {user}, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged(userResponse => {
      // console.log(userResponse)
      if (userResponse && user !=='guest') {
        dispatch({ type: "SET_USER", user: userResponse })
      }
      else {
        dispatch({ type: "SET_USER", user: 'guest' })
      }
    })
  }, [])

  return (
    <Router>
      <div className="App">

        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path="/store">
            <Header />
            <Store />
          </Route>

          <Route path="/orders">
            <Header />
            <Orders />
          </Route>

          <Route path="/profile">
            <Header />
            <Profile />
          </Route>

          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>


  );
}

export default App;
