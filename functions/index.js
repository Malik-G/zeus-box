const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
require('dotenv').config();
const stripe_payment_key = require("./apiKeys")
const stripe = require("stripe")(stripe_payment_key.apiKey);

//App config
const app = express();

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API Routes
app.get('/', (req, res) => {
  res.status(200).send('hello world');
})

app.post('/payments/create', async (req, res) => {
  const total = req.query.total;
  console.log(`Payment request received!! Total = ${total}`);
  // console.log(`THE STRIPE OBJECT ### `, stripe)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd',
  })
  // .catch(error=>{console.log(error)})
  res.status(201).send({ clientSecret: paymentIntent.client_secret })
})

// this 'api' is the reference used in the firebase provided BaseURL, e.g. http://localhost:5001/clone-590dd/us-central1/api/
exports.api = functions.https.onRequest(app)