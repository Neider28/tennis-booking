"use client"
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import IsNotAuth from "@/middlewares/isNotAuth.middleware";
import IsUser from "@/middlewares/isUser.middleware";
import { FindOneClass } from "@/services/Schedule";
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
  Timeline,
} from "antd";
import Link from "next/link";
import NotFound from "@/components/NotFound";
import { ClassI } from "@/interfaces/class.interface";
import { ScheduleI } from "@/interfaces/schedule.interface";
import { FindInstructorsAvailable, FindOneInstructor } from "@/services/Instructor";
import { InstructorI } from "@/interfaces/instructor.interface";
import { Scheduler } from "@aldabil/react-scheduler";
import AddAvailabilityToClass from "@/components/AddAvailabilityToClass";
import { useMyContext } from "@/context/MainContext";
import Confirm from "@/components/Confirm";

export default function ClassDetail({ params }: { params: { id: string } }) {
  const [classDetail, setClassDetail] = useState<ClassI>();
  const [instructorsAvailable, setInstructorsAvailable] = useState<InstructorI[]>([]);
  const [instructorSelected, setInstructorSelected] = useState<InstructorI>();
  const [error, setError] = useState<boolean | null>(null);
  const { mySchedule, setMySchedule, isAvailable, setIsAvailable, setDisabled, setConfirmDetails } = useMyContext();

  const onChange1 = (e: RadioChangeEvent) => {
    setIsAvailable(true);
  };

  const onChange2 = async (e: RadioChangeEvent) => {
    setDisabled(false);

    try {
      const token = getTokenCookie();

      if(token) {
        const res: InstructorI = await FindOneInstructor(token, e.target.value);

        setInstructorSelected(res);

        setMySchedule(res.availability.map((item: any) => {
          return {
            event_id: item._id,
            title:  `${res.firstName} ${res.lastName}`,
            start: new Date(item.startDate),
            end: new Date(item.endDate),
          };
        }));
      }
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    const fetchclassDetail = async () => {
      try {
        const token = getTokenCookie();

        if(token) {
          const res: ClassI = await FindOneClass(token, params.id);
          setClassDetail(res);

          if (res.classType === 'individual') {
            const res: any = await FindInstructorsAvailable(token, params.id);
            setInstructorsAvailable(res);
          }
        }
      } catch (error) {
        setError(true);
      }
    };

    setIsAvailable(false);
    setDisabled(true);
    setMySchedule([]);
    fetchclassDetail();
  }, []);

  return (
    <IsNotAuth>
      <IsUser>
        <ConfigProvider theme={theme}>
          <Header />
          <main className="w-full p-2 pt-10 flex justify-center">
          {(classDetail && !error) && (<>
            <Card
              className="h-fit w-full sm:w-9/12 lg:w-[60rem] pb-20 rounded-lg"
              style={{
                backgroundColor: "#000411",
                color: "#E1EFE6",
                border: "none",
              }}
            >
              <h2 className="text-3xl text-naples-yellow font-semibold mb-4">
                {classDetail.title}
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
                {classDetail.skillLevel}
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
                {classDetail.classType}
              </Tag>
              <p className="my-4 text-base text-honeydew">
                {classDetail.description}
              </p>
              <p className="mb-4 text-2xl text-naples-yellow font-semibold">
                ${classDetail.cost} / hour
              </p>
              <Space size={[0, 8]} wrap>
                <Tag
                  color="#87d068"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                  }}
                >
                  {classDetail.participants} participants
                </Tag>
                <Tag
                  color="#108ee9"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                  }}
                >
                  0 registered
                </Tag>
              </Space>
              {classDetail.classType === "group" && (
                <div className="w-full mt-10">
                  <h3 className="text-2xl text-naples-yellow font-semibold mb-4">
                    Schedules available
                  </h3>
                  {classDetail.schedules.length === 0 ? (
                    <Alert message="There are no schedules at this class." type="error" />
                  ) : (
                    <Radio.Group onChange={onChange1}>
                      <Space direction="vertical">
                        {classDetail.schedules.map((item: ScheduleI) => (
                          <Radio key={item._id} value={item._id}>
                            <Timeline
                              style={{
                                marginTop: "2.5rem",
                                color: "#E1EFE6",
                                fontWeight: 500,
                              }}
                              items={[
                                {
                                  children: new Date(item.startDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }) + " " + new Date(item.startDate).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric",
                                    hour12: true,
                                  }),
                                },
                                {
                                  children: new Date(item.endDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }) + " " + new Date(item.endDate).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric",
                                    hour12: true,
                                  }),
                                },
                              ]} />
                          </Radio>
                        ))}
                      </Space>
                    </Radio.Group>
                  )}
                </div>
              )}
              {classDetail.classType === "individual" && (
                <div className="w-full mt-10">
                  <h3 className="text-2xl text-naples-yellow font-semibold mb-4">
                    Available Instructors
                  </h3>
                  {instructorsAvailable.length === 0 ? (
                    <Alert message="There are no instructors at this class." type="error" />
                  ) : (
                    <Radio.Group onChange={onChange2}>
                      <Space direction="vertical">
                        {instructorsAvailable.map((item: any) => (
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
                  <div className="w-full h-fit mt-10">
                    {instructorSelected && (
                      <AddAvailabilityToClass instructor={instructorSelected} cost={classDetail.cost} />
                    )}
                    <Scheduler
                      view="week"
                      editable={false}
                      draggable={false}
                      deletable={false}
                      day={{
                        startHour: 6,
                        endHour: 23,
                        step: 30,
                        navigation: true,
                      }}
                      week={{
                        weekDays: [0, 1, 2, 3, 4, 5],
                        weekStartOn: 1,
                        startHour: 6,
                        endHour: 23,
                        step: 30,
                        navigation: true,
                        disableGoToDay: true,
                      }}
                      month={{
                        weekDays: [0, 1, 2, 3, 4, 5],
                        weekStartOn: 1,
                        startHour: 6,
                        endHour: 23,
                        navigation: true,
                        disableGoToDay: false,
                      }}
                      events={mySchedule} />
                  </div>
                </div>
              )}
              {(isAvailable) && (
                <div className="w-full flex justify-end mt-10">
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
            <Confirm id={params.id} /></>
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
