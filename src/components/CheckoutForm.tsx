import React, {FormEvent, useState} from "react";
import {useStripe, useElements, PaymentElement} from "@stripe/react-stripe-js";
import { Button } from "antd";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<any>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        className="w-full mt-8 bg-naples-yellow"
        type="primary" 
        htmlType="submit"
        size="large"
        disabled={!stripe}
      >
        Pay Now
      </Button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};
