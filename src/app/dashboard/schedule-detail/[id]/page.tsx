"use client"
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import IsNotAuth from "@/middlewares/isNotAuth.middleware";
import IsUser from "@/middlewares/isUser.middleware";
import { FindOneSchedule } from "@/services/Schedule";
import theme from "@/theme/themeConfig";
import { getTokenCookie } from "@/utils/cookie.util";
import { CreditCardOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  ConfigProvider,
  Radio,
  RadioChangeEvent,
  Space,
  Tag,
  Timeline
} from "antd";
import Link from "next/link";
import NotFound from "@/components/NotFound";
import { ScheduleI } from "@/interfaces/schedule.interface";

export default function ScheduleDetail({ params }: { params: { id: string } }) {
  const [scheduleDetail, setScheduleDetail] = useState<any>(null);
  const [error, setError] = useState<boolean | null>(null);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    // setValue(e.target.value);
  };

  useEffect(() => {
    const fetchScheduleDetail = async () => {
      try {
        const token = getTokenCookie();

        if(token) {
          const res = await FindOneSchedule(token, params.id);
          setScheduleDetail(res);
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchScheduleDetail();
  }, []);

  return (
    <IsNotAuth>
      <IsUser>
        <ConfigProvider theme={theme}>
          <Header />
          <main className="w-full p-2 pt-10 flex justify-center">
          {(scheduleDetail && !error) && (
            <Card
              className="h-fit w-full sm:w-9/12 lg:w-[60rem] pb-20 rounded-lg"
              style={{
                backgroundColor: "#000411",
                color: "#E1EFE6",
                border: "none",
              }}
            >
              <h2 className="text-3xl text-naples-yellow font-semibold mb-4">
                {scheduleDetail.classSchedule.title}
              </h2>
              <Tag
                bordered={true}
                color="#F50"
                style={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  textTransform: "capitalize",
                }}
              >
                {scheduleDetail.classSchedule.skillLevel}
              </Tag>
              <Tag
                bordered={true}
                color="#108ee9"
                style={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  textTransform: "capitalize",
                }}
              >
                {scheduleDetail.classSchedule.classType}
              </Tag>
              <p className="my-4 text-base text-honeydew">
                {scheduleDetail.classSchedule.description}
              </p>
              <p className="mb-4 text-2xl text-naples-yellow font-semibold">
                ${scheduleDetail.classSchedule.cost}
              </p>
              <Space size={[0, 8]} wrap>
                <Tag
                  color="#87d068"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                  }}
                >
                  {scheduleDetail.classSchedule.participants} participants
                </Tag>
                <Tag
                  color="#108ee9"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                  }}
                >
                  5 registered
                </Tag>
              </Space>
              <Timeline
                style={{
                  marginTop: "2.5rem",
                  color: "#E1EFE6",
                  fontWeight: 500,
                }}
                items={[
                  {
                    children: new Date(scheduleDetail.classSchedule.schedules[0].startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }) + " " + new Date(scheduleDetail.classSchedule.schedules[0].startDate).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: true,
                    }),
                  },
                  {
                    children: new Date(scheduleDetail.classSchedule.schedules[0].endDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }) + " " + new Date(scheduleDetail.classSchedule.schedules[0].endDate).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: true,
                    }),
                  },
                ]}
              />
              {scheduleDetail.classSchedule.classType === "individual" && (
                <div className="w-full mt-4">
                  <h3 className="text-2xl text-naples-yellow font-semibold mb-4">
                    Instructors available
                  </h3>
                  {scheduleDetail.instructorsAvailable.length === 0 ? (
                    <Alert message="There are no instructors at this time." type="error" />
                  ) : (
                    <Radio.Group onChange={onChange}>
                      <Space direction="vertical">
                        {scheduleDetail.instructorsAvailable.map((item: any) => (
                          <Radio key={item._id} value={item._id}>
                            <Link
                              href={`/instructor/${item._id}`}
                              target="_blank"
                              className="text-base text-honeydew hover:text-naples-yellow"
                            >
                              {`${item.firstName} ${item.lastName}`}
                            </Link>
                          </Radio>
                        ))}
                      </Space>
                    </Radio.Group>
                  )}
                </div>
              )}
              {scheduleDetail.instructorsAvailable.length !== 0 && (
                <div className="w-full flex justify-end mt-4">
                  <Link href={`/checkout/${params.id}`}>
                    <Button
                      className="bg-naples-yellow"
                      ghost
                      type="primary"
                      icon={<CreditCardOutlined />}
                      size="large"
                    >
                      Check In
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          )}
          {error && (
            <div className='h-fit w-full sm:w-9/12 lg:w-[60rem] pb-20'>
              <NotFound />
            </div>
          )}
          </main>
        </ConfigProvider>
      </IsUser>
    </IsNotAuth>
  );
};
