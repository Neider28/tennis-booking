"use client"
import theme from "@/theme/themeConfig";
import { Button, ConfigProvider, Result } from "antd";
import Link from "next/link";

export default function NotAuthorized() {
  return (
    <ConfigProvider theme={theme}>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Link href="/dashboard">
            <Button
              type="primary"
              style={{
              color: "#000411",
              }}
              size="large"
            >
              Back Home
            </Button>
          </Link>
        }
      />
    </ConfigProvider>
  );
};
