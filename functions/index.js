const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(`${process.env.stripe_payment_key}`);

//App config
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//API Routes
app.get('/', (req, res) => {
  res.status(200).send('hello world');
})

app.post('/payments/create', async (req, res) => {
  const total = req.query.total;
  console.log(`Payment request received!! Total = ${total}`);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd',
  })
  res.status(201).send({ clientSecret: paymentIntent.client_secret })
})

// this 'api' is the reference used in the firebase provided BaseURL, e.g. http://localhost:5001/clone-590dd/us-central1/api/
exports.api = functions.https.onRequest(app)