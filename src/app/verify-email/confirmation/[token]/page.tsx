"use client"
import { VerifyUser } from "@/services/Auth";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import IsAuth from "@/middlewares/isAuth.middleware";
import { setTokenCookie } from "@/utils/cookie.util";
import Loading from "@/components/Loading";
import { TokenI } from "@/interfaces/token.interface";

export default function ConfirmationEmail({ params } : { params: { token: string } }) {
  const router = useRouter();

  useEffect(() => {
    const fetchVerify = async () => {
      const check: TokenI = await VerifyUser(params.token);

      if (check) {
        const token = check.access_token;

        setTokenCookie(token, 360);

        router.push('/');
      } else {
        console.log('error');
      }
    };

    fetchVerify();
  }, []);

  return (
    <IsAuth>
      <ConfigProvider theme={theme}>
        <Loading />
      </ConfigProvider>
    </IsAuth>
  );
};
