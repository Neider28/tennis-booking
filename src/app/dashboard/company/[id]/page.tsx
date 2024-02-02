"use client"
import React, { useEffect, useState } from "react";
import {
  BookOutlined,
  HighlightOutlined,
  ScheduleOutlined,
  TeamOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { ConfigProvider, Button, Space, Tag, message, Card } from "antd";
import theme from "@/theme/themeConfig";
import { useMyContext } from "@/context/MainContext";
import { getTokenCookie } from "@/utils/cookie.util";
import IsNotAuth from "@/middlewares/isNotAuth.middleware";
import IsUser from "@/middlewares/isUser.middleware";
import Header from "@/components/Header";
import { AddStudentToCompany, FindOneCompany } from "@/services/Company";
import Link from "next/link";
import ProfileCover from "@/components/ProfileCover";
import { CompanyI } from "@/interfaces/company.interface";
import { StudentI } from "@/interfaces/student.interface";
import { ClassI } from "@/interfaces/class.interface";

export default function CompanyPage({ params }: { params: { id: string } }) {
  const { profile } = useMyContext();
  const [companyDetail, setCompanyDetail] = useState<CompanyI>();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Successful registration.",
    });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Internal error.",
    });
  };

  const OnRegister = async () => {
    try {
      const token = getTokenCookie();

      if(token) {
        setLoading(true);
        const res = await AddStudentToCompany(token, params.id);

        if (res) {
          setLoading(false);
          setCompanyDetail(res);
          success();
        }
      }
    } catch (error) {
      setLoading(true);
      warning();
    }
  };

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = getTokenCookie();

        if(token) {
          const res: CompanyI = await FindOneCompany(token, params.id);
          document.title = `${res.name}`;
          setCompanyDetail(res);
        }
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      }
    };
 
    fetchCompany();
  }, []);

  return (
    <IsNotAuth>
      <IsUser>
        <ConfigProvider theme={theme}>
          {contextHolder}
          <Header />
          {(companyDetail && profile) && (
            <main className="w-full p-2 pt-10 flex justify-center">
              <div className="h-fit w-full sm:w-9/12 lg:w-[60rem] pb-20 relative">
                <ProfileCover banner={companyDetail.banner} image={companyDetail.logo} />
                <div className="w-full mt-14 lg:mt-24">
                  <h2 className="text-3xl font-semibold text-honeydew capitalize">
                    {companyDetail.name}
                  </h2>
                  <span className="text-base lg:text-lg font-medium text-naples-yellow capitalize">
                    {companyDetail.user.role}
                  </span>
                </div>
                <div className="w-full mt-6">
                  <Space size={[0, 8]} wrap>
                    <Tag
                      icon={<TeamOutlined />}
                      color="rgb(45, 183, 245)"
                      style={{
                        color: "#000411",
                        fontSize: "1rem",
                        fontWeight: "600",
                        padding: "5px",
                      }}
                    >
                      {companyDetail.instructors.length} instructors
                    </Tag>
                    <Tag
                      icon={<BookOutlined />}
                      color="#f50"
                      style={{
                        color: "#000411",
                        fontSize: "1rem",
                        fontWeight: "600",
                        padding: "5px",
                      }}
                    >
                      {companyDetail.classes.length} classes
                    </Tag>
                    <Tag
                      icon={<TrophyOutlined />}
                      color="#87d068"
                      style={{
                        color: "#000411",
                        fontSize: "1rem",
                        fontWeight: "600",
                        padding: "5px",
                      }}
                    >
                      {companyDetail.students.length} students
                    </Tag>
                  </Space>
                </div>
                <div className="w-full mt-14">
                  <p className="text-honeydew text-base font-normal leading-loose text-start">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim cras tincidunt lobortis feugiat vivamus at. Rhoncus dolor purus non enim praesent elementum facilisis leo. Non diam phasellus vestibulum lorem sed. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Et malesuada fames ac turpis egestas sed tempus. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Nec dui nunc mattis enim ut tellus elementum sagittis vitae. Turpis egestas sed tempus urna et. Egestas maecenas pharetra convallis posuere morbi leo urna molestie at. Sit amet mattis vulputate enim nulla aliquet porttitor. Sed velit dignissim sodales ut eu sem integer vitae justo. Morbi tempus iaculis urna id. Elit sed vulputate mi sit amet. Elementum pulvinar etiam non quam lacus suspendisse faucibus. Bibendum at varius vel pharetra vel turpis nunc eget lorem. Eget nunc lobortis mattis aliquam. Sit amet justo donec enim diam vulputate. Lorem mollis aliquam ut porttitor leo a diam sollicitudin.
                  </p>
                </div>
                <div className="w-full mt-10">
                  <h3 className="text-2xl text-naples-yellow font-semibold mb-4">
                    Available Classes
                  </h3>
                  <div className="flex flex-col flex-wrap gap-y-8 sm:flex-row sm:gap-8">
                    {companyDetail.classes.map((item: ClassI) => (
                      <Link key={item._id} href={`/dashboard/class-detail/${item._id}`}>
                        <Card
                          title={item.title}
                          hoverable
                          bordered={false}
                          key={item._id}
                          className="w-full"
                        >
                          <Tag
                            bordered={true}
                            color="#F50"
                            className="mb-2 min-[389px]:mb-0"
                            style={{
                              fontSize: "1rem",
                              fontWeight: "500",
                              textTransform: "capitalize",
                            }}
                          >
                            {item.skillLevel}
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
                            {item.classType}
                          </Tag>
                          <p className="mt-2 text-2xl text-rich-black font-semibold">
                            ${item.cost}
                          </p>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="w-full mt-14 flex justify-center">
                  {companyDetail.students.some((student: StudentI) => student._id === profile._id) ? (
                    // <Link href={`/dashboard/company/schedule/${params.id}`}>
                    //   <Button
                    //     type="primary"
                    //     style={{
                    //       color: "#000411",
                    //     }}
                    //     size="large"
                    //     icon={<ScheduleOutlined />}
                    //   >
                    //     See schedules
                    //   </Button>
                    // </Link>
                    null
                  ) : (
                    <Button
                      type="primary"
                      onClick={() => OnRegister()}
                      loading={loading}
                      style={{
                        color: "#000411",
                      }}
                      size="large"
                      icon={<HighlightOutlined />}
                    >
                      Register
                    </Button>
                  )}
                </div>
              </div>
            </main>
          )}
        </ConfigProvider>
      </IsUser>
    </IsNotAuth>
  );
};
