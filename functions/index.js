const functions = require("firebase-functions"),
  express = require("express"),
  cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51HR7tXDaDjvLaSNDk4DuKJ4lzzmrbH0BelATsD9OFvsaNf8BGyyyM6TZPmyAInGxzIrjjdUVcri6qkQmijss8zna00ykNmPdG6"
);

// API

// - App Config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (req, res) => res.status(200).send("helloworld"));

app.post("/payments/create", async (req, res) => {
  const total = Math.round(req.query.total);
  console.log("Payment Request Recived Jupiter for this amount >>>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // Subunits of the currency
    currency: "usd",
  });
  // OK - Created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);
