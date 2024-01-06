import ClassDetail from "@/components/ClassDetail";
import IsAdmin from "@/middlewares/isAdmin.middleware";
import IsNotAuth from "@/middlewares/isNotAuth.middleware";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";

export default function ClassDetailAdmin({ params }: { params: { id: string } }) {
  return (
    <IsNotAuth>
      <IsAdmin>
        <ConfigProvider theme={theme}>
          <ClassDetail id={params.id} isAdmin={true} />
        </ConfigProvider>
      </IsAdmin>
    </IsNotAuth>
  );
};
