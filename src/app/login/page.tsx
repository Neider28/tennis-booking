"use client"
import { FormEvent, useEffect, useState } from "react";
import IsAuth from "@/middlewares/isAuth.middleware";
import logo from "../../../public/logo.png";
import theme from "@/theme/themeConfig";
import { GoogleLogin } from "@react-oauth/google";
import { Button, ConfigProvider, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignInAuth, SignInGoogleAuth } from "@/services/Auth";
import { setTokenCookie } from "@/utils/cookie.util";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SignInUserI } from "@/interfaces/user.interface";
import { TokenI } from "@/interfaces/token.interface";

export default function Login() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const warning = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoad(true);

    const user: SignInUserI = {
      email,
      password,
    };

    try {
      const res: TokenI = await SignInAuth(user);

      setTimeout(() => {
        if (res) {
          const token = res.access_token;
          const decoded = jwt.decode(token) as JwtPayload;

          setTokenCookie(token, 360);

          if ('role' in decoded) {
            const role = decoded.role;

            if (role === 'company') {
              router.push('/dashboard/admin');
            } else {
              router.push('/dashboard');
            }
          }
        } else {
          setLoad(false);
          warning("Incorrect credentials. Verify your email and password and try again.");
        }
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setLoad(false);
        warning("Incorrect credentials. Verify your email and password and try again.");
      }, 2000);
    }
  };

  useEffect(() => {
    document.title = "Login";
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
                className="w-full h-10 px-2 mb-4 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full h-10 px-2 mb-6 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className="w-full bg-naples-yellow"
                type="primary"
                htmlType="submit"
                size="large"
                loading={load}
              >
                Login
              </Button>
            </form>
            <span className="my-4 text-honeydew">or Sign in with:</span>
            <GoogleLogin
              theme="filled_blue"
              type="icon"
              size="large"
              onSuccess={async (credentialResponse) => {
                try {
                  const data = await SignInGoogleAuth(credentialResponse);

                  if (data) {
                    const token = data.access_token;

                    setTokenCookie(token, 360);

                    router.push("/profile");
                  }
                } catch (error) {
                  setLoad(false);
                  warning("Unregistered user");
                }
              }}
              onError={() => {
                warning("Unregistered user");
              }}
            />
          </div>
        </main>
      </ConfigProvider>
    </IsAuth>
  );
};
