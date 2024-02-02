"use client"
import Header from "@/components/Header";
import theme from "@/theme/themeConfig";
import { Button, ConfigProvider } from "antd";
import Image from "next/image";
import success from "../../../../../public/images/success.png";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { getTokenCookie } from "@/utils/cookie.util";
import { ConfirmPayment, FindOnePayment } from "@/services/Payment";

export default function Success({ params }: { params: { id: string } }) {
  useEffect(() => {
    const verify = async () => {
      const token = getTokenCookie();

      if (token) {
        const payment = await FindOnePayment(token, params.id);

        if (payment.isPaid === false) {
          const res = await ConfirmPayment(token, params.id);
          console.log(res);
        }
      }
    };

    verify();
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <Header />
      <main className="w-full h-fix p-2 pb-20 mt-8 flex justify-center">
        <div className="h-fit flex justify-center items-center flex-col w-full sm:w-9/12 lg:w-[60rem]">
          <Image
            src={success}
            alt="Logo"
            width={250}
            height={250}
            priority
          />
          <p className="sm:w-[36rem] text-honeydew text-lg mt-4 mb-8 text-center">
            Order number: {params.id}. The purchase receipt will arrive in your email.
          </p>
          <Button
            className="bg-naples-yellow"
            type="primary"
            size="large"
            icon={<ArrowLeftOutlined />}
          >
            Go to dashboard
          </Button>
        </div>
      </main>
    </ConfigProvider>
  );
};
