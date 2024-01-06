"use client"
import theme from "@/theme/themeConfig";
import { CreditCardOutlined } from "@ant-design/icons";
import { Button, Card, ConfigProvider, Space, Tag } from "antd";
import Header from "./Header";
import { useEffect, useState } from "react";
import { FindOneClass } from "@/services/Schedule";
import { getTokenCookie } from "@/utils/cookie.util";
import Link from "next/link";
import UpdateSchedule from "./UpdateClass";
import { useMyContext } from "@/context/MainContext";
import NotFound from "./NotFound";
import { ClassI } from "@/interfaces/class.interface";

export default function ClassDetail({ id, isAdmin }: { id: string, isAdmin: boolean }) {
  const [error, setError] = useState(false);
  const { classItem, setClassItem } = useMyContext();

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const token = getTokenCookie();

        if(token) {
          const res: ClassI = await FindOneClass(token, id);
          setClassItem(res);
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchClass();
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <Header />
      <main className="w-full h-screen p-2 pt-10 flex justify-center">
        {classItem && !error && (
          <Card
            className="h-fit w-full sm:w-9/12 lg:w-[60rem] rounded-lg"
            style={{
              backgroundColor: "#000411",
              color: "#E1EFE6",
              border: "none",
            }}
          >
            <h2 className="text-3xl text-naples-yellow font-semibold mb-4">
              {classItem.title}
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
              {classItem.skillLevel}
            </Tag>
            <p className="my-4 text-base text-honeydew">
              {classItem.description}
            </p>
            <p className="mb-4 text-2xl text-naples-yellow font-semibold">
              ${classItem.cost}
            </p>
            <Space size={[0, 8]} wrap>
              <Tag
                color="#87d068"
                style={{
                  fontSize: "1rem",
                  fontWeight: "500",
                }}
              >
                {classItem.participants} participants
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
            <div className="w-full flex justify-end">
              {isAdmin ? (
                <UpdateSchedule id={id} />
              ) : (
                <Link href={`/checkout/${id}`}>
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
              )}
            </div>
          </Card>
        )}
        {error && (
          <div className='h-fit w-full sm:w-9/12 lg:w-[60rem] pb-20'>
            <NotFound />
          </div>
        )}
      </main>
    </ConfigProvider>
  );
};
