import ScheduleItem from "@/components/ScheduleItem"
import IsAdmin from "@/middlewares/isAdmin.middleware"
import IsNotAuth from "@/middlewares/isNotAuth.middleware"
import theme from "@/theme/themeConfig"
import { ConfigProvider } from "antd"

export default function ScheduleDetailAdmin({ params }: { params: { id: string } }) {
  return (
    <IsNotAuth>
      <IsAdmin>
        <ConfigProvider theme={theme}>
          <ScheduleItem id={params.id} isAdmin={true} />
        </ConfigProvider>
      </IsAdmin>
    </IsNotAuth>
  )
}
