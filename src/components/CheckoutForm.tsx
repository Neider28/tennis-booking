import React, {FormEvent, useState} from "react";
import {useStripe, useElements, PaymentElement} from "@stripe/react-stripe-js";
import { Button } from "antd";

export default function CheckoutForm({ id }: { id: string }) {
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
        return_url: `${process.env.API_PROD}/checkout/success/${id}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      
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
