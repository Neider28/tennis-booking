"use client"
import React, { useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import { useMyContext } from "@/context/MainContext";
import { getTokenCookie } from "@/utils/cookie.util";
import IsNotAuth from "@/middlewares/isNotAuth.middleware";
import IsUser from "@/middlewares/isUser.middleware";
import Header from "@/components/Header";
import { Scheduler } from "@aldabil/react-scheduler";
import { FindOneCompany } from "@/services/Company";
import { useRouter } from "next/navigation";
import NotAuthorized from "@/components/NotAuthorized";
import { CompanyI } from "@/interfaces/company.interface";
import { StudentI } from "@/interfaces/student.interface";
import { EventI } from "@/interfaces/event.interface";

export default function CompanySchedule({ params }: { params: { id: string } }) {
  const { profile } = useMyContext();
  const [schedulesCompany, setSchedulesCompany] = useState<EventI[]>([]);
  const [companyDetail, setCompanyDetail] = useState<CompanyI>();
  const router = useRouter();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const token = getTokenCookie();

        if(token) {
          const res: CompanyI = await FindOneCompany(token, params.id);
          document.title = `Schedules | ${res.name}`;

          setCompanyDetail(res);

          setSchedulesCompany(res.classes.flatMap((item1: any) => {
            return item1.schedules.map((item2: any) => {
              return {
                event_id: item2._id,
                title: item1.title,
                start: new Date(item2.startDate),
                end: new Date(item2.endDate),
              };
            });
          }));
        }
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      }
    };

    fetchSchedules();
  }, []);

  return (
    <IsNotAuth>
      <IsUser>
        <ConfigProvider theme={theme}>
          <Header />
          {(companyDetail && profile) && (
            <main className="w-full p-2 pt-10 flex justify-center">
              {companyDetail.students.some((student: StudentI) => student._id === profile._id) ? (
                <div className="w-full p-3 lg:p-6">
                  <Scheduler
                    view="week"
                    editable={false}
                    draggable={false}
                    deletable={false}
                    onEventClick={(e) => router.push(`/dashboard/schedule-detail/${e.event_id}`)}
                    day={{
                      startHour: 6,
                      endHour: 20,
                      step: 30,
                      navigation: true,
                    }}
                    week={{
                      weekDays: [0, 1, 2, 3, 4, 5],
                      weekStartOn: 1,
                      startHour: 6,
                      endHour: 20,
                      step: 30,
                      navigation: true,
                      disableGoToDay: true,
                    }}
                    month={{
                      weekDays: [0, 1, 2, 3, 4, 5],
                      weekStartOn: 1,
                      startHour: 6,
                      endHour: 20,
                      navigation: true,
                      disableGoToDay: false,
                    }}
                    events={schedulesCompany}
                  />
                </div>
              ) : (
                <div className="h-fit w-full sm:w-9/12 lg:w-[60rem] pb-20">
                  <NotAuthorized />
                </div>
              )}
            </main>
          )}
        </ConfigProvider>
      </IsUser>
    </IsNotAuth>
  );
};
