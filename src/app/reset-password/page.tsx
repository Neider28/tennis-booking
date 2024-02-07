"use client"
import { FormEvent, useEffect, useState } from "react";
import IsAuth from "@/middlewares/isAuth.middleware";
import logo from "../../../public/logo.png";
import theme from "@/theme/themeConfig";
import { Button, ConfigProvider, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { ResetPasswordUser } from "@/services/Auth";

export default function ResetPassword() {
  const [messageApi, contextHolder] = message.useMessage();
  const [load, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const warning = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoad(true);

    const body = {
      email,
    };

    try {
      const res: boolean = await ResetPasswordUser(body);

      if (res) {
        setSuccess(true);
      } else {
        setLoad(false);
        warning("Internal error.");
      }
    } catch (error) {
      setLoad(false);
      warning("Internal error.");
    }
  };

  useEffect(() => {
    document.title = "Reset Password";
    setSuccess(false);
  }, []);

  return (
    <IsAuth>
      <ConfigProvider theme={theme}>
        <main className="w-full h-screen p-2 flex justify-center items-center">
          {contextHolder}
          <div className="w-full flex flex-col justify-center items-center sm:w-2/4 lg:w-80 rounded-lg sm:px-4 sm:py-8 sm:border sm:border-solid sm:border-naples-yellow">
            <Link href="/">
              <Image src={logo} alt="Logo" width={175} height={175} priority />
            </Link>
            {success ? (
              <p className="text-sm md:text-base text-honeydew">
                Please check your email inbox for a link to complete the reset.
              </p>
            ) : (
            <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center">
              <input
                className="w-full h-10 px-2 mb-4 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                className="w-full bg-naples-yellow"
                type="primary"
                htmlType="submit"
                size="large"
                loading={load}
              >
                Reset Password
              </Button>
            </form>
            )}
          </div>
        </main>
      </ConfigProvider>
    </IsAuth>
  );
};
