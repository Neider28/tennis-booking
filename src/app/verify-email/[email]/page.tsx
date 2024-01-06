"use client"
import { ConfigProvider } from "antd";
import logo from "../../../../public/logo.png";
import theme from "@/theme/themeConfig";
import Image from "next/image";
import Link from "next/link";
import IsAuth from "@/middlewares/isAuth.middleware";

export default function VerifyEmail({ params }: { params: { email: string } }) {
  return (
    <IsAuth>
      <ConfigProvider theme={theme}>
        <main className="w-full h-screen p-2 flex justify-center items-center">
          <div className="w-full flex flex-col justify-center items-center sm:w-2/4 lg:w-80 rounded-lg sm:px-4 sm:py-8 sm:border sm:border-solid sm:border-naples-yellow">
            <Link href="/">
              <Image src={logo} alt="Logo" width={175} height={175} priority />
            </Link>
            <p className="text-sm md:text-base text-honeydew">
              Ready! We have sent a verification link to your email address 
              (<span className="text-naples-yellow font-medium">{params.email.replace(/%40/g, "@")}</span>). 
              Please verify to continue.
            </p>
          </div>
        </main>
      </ConfigProvider>
    </IsAuth>
  );
};
