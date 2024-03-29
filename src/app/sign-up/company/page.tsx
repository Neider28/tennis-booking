"use client"
import { FormEvent, useEffect, useState } from "react";
import { SignUpCompany } from "@/services/Auth";
import logo from "../../../../public/logo.png";
import theme from "@/theme/themeConfig";
import { Button, ConfigProvider, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import IsAuth from "@/middlewares/isAuth.middleware";
import { CompanyI, SignUpCompanyI } from "@/interfaces/company.interface";

export default function SignUp() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [load, setLoad] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [blockFields, setBlockFields] = useState(false);

  const warning = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoad(true);
    setBlockFields(true);

    const company: SignUpCompanyI = {
      name,
      user: {
        email,
        password,
      },
    };

    try {
      const res: CompanyI = await SignUpCompany(company);

      if (res) {
        router.push(`/verify-email/${res.user.email}`);
      }
    } catch (error: any) {
      setLoad(false);
      setBlockFields(false);
      warning(error.message);
    }
  };

  useEffect(() => {
    document.title = "Sign Up | Company";
    setBlockFields(false);
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
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col justify-center items-center"
            >
              <input
                className="w-full h-10 px-2 mb-4 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow"
                type="text"
                name="name"
                id="name"
                placeholder="Company Name"
                value={name}
                disabled={blockFields}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full h-10 px-2 mb-4 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                disabled={blockFields}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full h-10 px-2 mb-6 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                disabled={blockFields}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className="w-full bg-naples-yellow"
                type="primary"
                htmlType="submit"
                size="large"
                loading={load}
                disabled={(name === "" || email === "" || password === "") ? true : false}
              >
                Sign Up
              </Button>
            </form>
          </div>
        </main>
      </ConfigProvider>
    </IsAuth>
  );
};
