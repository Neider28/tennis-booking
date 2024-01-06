"use client"
import theme from "@/theme/themeConfig";
import { Button, ConfigProvider, Result } from "antd";
import Link from "next/link";

export default function NotFound() {
  return (
    <ConfigProvider theme={theme}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
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
