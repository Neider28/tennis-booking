"use client"
import { FormEvent, useEffect, useState } from "react";
import IsAuth from "@/middlewares/isAuth.middleware";
import logo from "../../../../public/logo.png";
import theme from "@/theme/themeConfig";
import { Button, ConfigProvider, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ResetPasswordConfirmUser } from "@/services/Auth";

export default function ResetPasswordConfirm({ params } : { params: { token: string } }) {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [load, setLoad] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      password,
    };

    try {
      if (password === confirmPassword) {
        const res: boolean = await ResetPasswordConfirmUser(params.token, body);

        if (res) {
          router.push('/login');
        } else {
          setLoad(false);
          warning("Internal error.");
        }
      } else {
        setLoad(false);
        warning("Sorry, the passwords provided do not match.");
      }
    } catch (error) {
      setLoad(false);
      warning("Internal error.");
    }
  };

  useEffect(() => {
    document.title = "Reset Password";
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
            <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center">
              <input
                className="w-full h-10 px-2 mb-6 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow"
                type="password"
                name="password"
                id="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="w-full h-10 px-2 mb-6 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow"
                type="password"
                name="confirm-password"
                id="confirmPassword"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                className="w-full bg-naples-yellow"
                type="primary"
                htmlType="submit"
                size="large"
                loading={load}
              >
                Save Password
              </Button>
            </form>
          </div>
        </main>
      </ConfigProvider>
    </IsAuth>
  );
};
