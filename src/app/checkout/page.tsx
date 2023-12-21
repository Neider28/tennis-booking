'use client'
import { CreatePayment } from '@/services/Payment';
import theme from '@/theme/themeConfig';
import {Elements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { Button, Card, ConfigProvider, Timeline } from 'antd';
import { useEffect, useState } from 'react';
import Image from 'next/image'
import logo from '../../../public/logo.png'
import IsNotAuth from '@/middlewares/isNotAuth.middleware';
import IsUser from '@/middlewares/isUser.middleware';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51ONIDRHesGCdAhAs9vmKF3njWrCwe91SAIhX2We9cSDvxn2NGvQ0VDXRy5whbbtEMq9HKEMeYkPvecISWlDcrQnu00SMIIWRLr');

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    try {
      const handle = async () => {
        const data = await CreatePayment({
          amount: 50,
          currency: 'USD'
        });

        console.log(data)

        const options = {
          // passing the client secret obtained from the server
          clientSecret: data.client_secret,
        };

        setClientSecret(data.client_secret);
      }
      
      handle();
    } catch (error) {
      
    }
  }, []);

  return (
    <IsNotAuth>
      <IsUser>
        <ConfigProvider theme={theme}>
          <main className='w-full h-auto p-2 sm:pt-10 flex justify-center'>
            <div className='h-fit flex flex-col sm:flex-row w-full sm:w-9/12 lg:w-[60rem]'>
            <Card className='h-fit w-full sm:w-2/4 rounded-lg' style={{
                backgroundColor: '#000411',
                color: '#E1EFE6',
                border: 'none'
              }}>
                <h2 className="text-3xl text-naples-yellow font-semibold mb-4">Nike Air Zoom Vapor</h2>
                <p className="mb-4 text-2xl text-honeydew font-semibold">$200</p>
                <Timeline
                  style={{
                    marginTop: '2.5rem',
                    color: '#E1EFE6',
                    fontWeight: 500,

                  }}
                  items={[
                    {
                      children: 'December 15, 2023 11:00 A.M',
                    },
                    {
                      children: 'December 15, 2023 11:30 A.M',
                    },
                  ]}
                />
              </Card>
            <Card className='h-fit w-full sm:w-2/4 rounded-lg' style={{
                backgroundColor: '#000411',
                color: '#E1EFE6',
                border: 'none'
              }}>
            {
              clientSecret !== '' ? (
                <Elements stripe={stripePromise} options={{ clientSecret, appearance: {theme: 'night'} }}>
                  <div className='w-full flex justify-center'>
                <Image src={logo} alt='Logo' width={150} height={150} priority />
                </div>
                  <form>
                    <PaymentElement />
                    <Button className='w-full mt-8 bg-naples-yellow' type='primary' htmlType='submit' size='large'>
                      Pay Now
                    </Button>
                  </form>
                </Elements>
              ) : null
            }
            </Card>
            </div>
          </main>
        </ConfigProvider>
      </IsUser>
    </IsNotAuth>
  );
};