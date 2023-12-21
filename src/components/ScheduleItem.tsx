'use client'
import theme from "@/theme/themeConfig"
import { CreditCardOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Card, ConfigProvider, Space, Tag, Timeline } from "antd"
import Header from "./Header"
import { useEffect, useState } from "react"
import { FindOneSchedule } from "@/services/Schedule"
import { getTokenCookie } from "@/utils/cookie.util"
import Loading from "./Loading"
import Link from "next/link"
import UpdateSchedule from "./UpdateSchedule"
import { useMyContext } from "@/context/MainContext"
import { MyProfile } from "@/services/Auth"

export default function ScheduleItem({ id, isAdmin }: { id: string, isAdmin: boolean }) {
  const [schedule,  setSchedule] = useState<any>(null);
  const [error, setError] = useState(false);
  const { profile, setProfile, scheduleDetail, setScheduleDetail } = useMyContext();

  useEffect(() => {
    try {
      const schedules = async (token: string) => {
        const data = await FindOneSchedule(token, id);

        if (!data) {
          setError(true);
        }

        setSchedule(data);
        setScheduleDetail(data);
      };

      const profile = async (token: string) => {
        const data = await MyProfile(token);
        
        setProfile(data);

        return data;
      };

      const token = getTokenCookie();

      if(token) {
        schedules(token);
        profile(token);
      }
    } catch (error) {
      setError(true);
    }
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <Header />
      <main className='w-full h-screen p-2 pt-10 flex justify-center'>
        {scheduleDetail && !error ? (
          <Card className='h-fit w-full sm:w-9/12 lg:w-[60rem] rounded-lg' style={{
            backgroundColor: '#000411',
            color: '#E1EFE6',
            border: 'none'
          }}>
            <h2 className="text-3xl text-naples-yellow font-semibold mb-4">{scheduleDetail.title}</h2>
            <Tag bordered={true} color="#F50" style={{
              fontSize: '1rem',
              fontWeight: '500',
              textTransform: 'capitalize',
            }}>
              {scheduleDetail.skillLevel}
            </Tag>
            <p className="my-4 text-base text-honeydew">{scheduleDetail.description}</p>
            <p className="mb-4 text-2xl text-naples-yellow font-semibold">${scheduleDetail.cost}</p>
            <Space size={[0, 8]} wrap>
              <Tag color="#87d068" style={{
                fontSize: '1rem',
                fontWeight: '500',
              }}>{scheduleDetail.participants} participants</Tag>
              <Tag color="#108ee9" style={{
                fontSize: '1rem',
                fontWeight: '500',
              }}>5 registered</Tag>
            </Space>
            <Timeline
              style={{
                marginTop: '2.5rem',
                color: '#E1EFE6',
                fontWeight: 500,

              }}
              items={[
                {
                  children: new Date(scheduleDetail.startDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }) + ' ' + new Date(scheduleDetail.startDate).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                  }),
                },
                {
                  children: new Date(scheduleDetail.endDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }) + ' ' + new Date(scheduleDetail.endDate).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                  }),
                },
              ]}
            />
            <div className="w-full flex justify-end">
              {isAdmin ? (
                <UpdateSchedule id={id} />
              ) : (
                <Link href='/checkout'>
                  <Button className="bg-naples-yellow" ghost type="primary" icon={<CreditCardOutlined />} size='large'>
                    Check In
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        ) : (
          <div>ID not found!</div>
        )}
      </main>
    </ConfigProvider>
  )
}
