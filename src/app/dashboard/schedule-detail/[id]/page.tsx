import ScheduleItem from "@/components/ScheduleItem"
import IsNotAuth from "@/middlewares/isNotAuth.middleware"
import IsUser from "@/middlewares/isUser.middleware"
import theme from "@/theme/themeConfig"
import { ConfigProvider } from "antd"

export default function ScheduleDetail({ params }: { params: { id: string } }) {
  return (
    <IsNotAuth>
      <IsUser>
        <ConfigProvider theme={theme}>
          <ScheduleItem id={params.id} isAdmin={false} />
        </ConfigProvider>
      </IsUser>
    </IsNotAuth>
  )
}
