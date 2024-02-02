"use client"
import { CreatePayment, CreatePaymentStripe, FindOnePayment } from "@/services/Payment";
import theme from "@/theme/themeConfig";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import { Card, ConfigProvider, Timeline } from "antd";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import IsNotAuth from "@/middlewares/isNotAuth.middleware";
import IsUser from "@/middlewares/isUser.middleware";
import CheckoutForm from "@/components/CheckoutForm";
import { getTokenCookie } from "@/utils/cookie.util";
import { FindOneClass } from "@/services/Schedule";
import NotAuthorized from "@/components/NotAuthorized";
import { PaymentI } from "@/interfaces/payment.interface";

const stripePromise = loadStripe("pk_test_51ONIDRHesGCdAhAs9vmKF3njWrCwe91SAIhX2We9cSDvxn2NGvQ0VDXRy5whbbtEMq9HKEMeYkPvecISWlDcrQnu00SMIIWRLr");

export default function Checkout({ params }: { params: { id: string } }) {
  const [clientSecret, setClientSecret] = useState("");
  const [schedule,  setSchedule] = useState<PaymentI | undefined>();
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const token = getTokenCookie();

        if(token) {
          const res = await FindOnePayment(token, params.id);
          const payment = await CreatePaymentStripe(token, {
            amount: res.cost,
            currency: "USD",
          });

          setClientSecret(payment.client_secret);
          setSchedule(res);
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchPayment();
  }, []);

  return (
    <IsNotAuth>
      <IsUser>
        <ConfigProvider theme={theme}>
          <main className="w-full h-auto p-2 sm:pt-10 flex justify-center">
            {schedule && (
              <div className="h-fit flex flex-col sm:flex-row w-full sm:w-9/12 lg:w-[60rem]">
                <Card
                  className="h-fit w-full sm:w-2/4 rounded-lg"
                  style={{
                    backgroundColor: "#000411",
                    color: "#E1EFE6",
                    border: "none",
                  }}
                >
                  <h2 className="text-3xl text-naples-yellow font-semibold mb-4">
                    {schedule.class.title}
                  </h2>
                  <p className="mb-4 text-2xl text-honeydew font-semibold">
                    ${schedule.cost}
                  </p>
                  <Timeline
                    style={{
                      marginTop: "2.5rem",
                      color: "#E1EFE6",
                      fontWeight: 500,
                    }}
                    items={[
                      {
                        children: new Date(schedule.schedule.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }) + " " + new Date(schedule.schedule.startDate).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                          hour12: true,
                        }),
                      },
                      {
                        children: new Date(schedule.schedule.endDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }) + " " + new Date(schedule.schedule.endDate).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                          hour12: true,
                        }),
                      },
                    ]}
                  />
                </Card>
                <Card
                  className="h-fit w-full sm:w-2/4 rounded-lg"
                  style={{
                    backgroundColor: "#000411",
                    color: "#E1EFE6",
                    border: "none",
                  }}
                >
                  {clientSecret !== "" && (
                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret,
                        appearance: {
                          theme: "night"
                        }
                      }}
                    >
                      <div className="w-full flex justify-center">
                        <Image
                          src={logo}
                          alt="Logo"
                          width={150}
                          height={150}
                          priority
                        />
                      </div>
                      <CheckoutForm id={params.id} />
                    </Elements>
                  )}
                </Card>
              </div>
            )}
            {error && (
              <div className="h-fit w-full sm:w-9/12 lg:w-[60rem] pb-20">
                <NotAuthorized />
              </div>
            )}
          </main>
        </ConfigProvider>
      </IsUser>
    </IsNotAuth>
  );
};
