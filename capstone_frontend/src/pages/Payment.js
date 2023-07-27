import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";
import "../stripe.css";
const APP_STRIPE_KEY =
  "pk_test_51NX4kpHevWicPNmpHwlLOg9gCHEHMEKZXtb6s6amg3f5KBcC9Sn6n7cVLRRUqOwKANIEO4BKSRzySfhEfERZ0jM200MfrX3FUm";
const promise = loadStripe(APP_STRIPE_KEY);

const Payment = () => {
  return (
    <div className="container p-5 text-center">
      <h4>Complete your purchase</h4>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
