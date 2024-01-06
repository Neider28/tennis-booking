"use client"
import Header from "@/components/Header";
import theme from "@/theme/themeConfig";
import { Button, ConfigProvider } from "antd";
import Image from "next/image";
import success from "../../../../../../public/images/success.png";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function Success() {
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
            Order number: 2017182818828182881. The purchase receipt will arrive in your email.
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
