import theme from "@/theme/themeConfig";
import { ConfigProvider, Spin } from "antd";

export default function Loading() {
  return (
    <ConfigProvider theme={theme}>
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 p-3">
        <Spin size="large" />
      </div>
    </ConfigProvider>
  );
};
