"use client"
import { useEffect, useState } from "react";
import AddAvailability from "@/components/AddAvailability";
import Header from "@/components/Header";
import IsAdmin from "@/middlewares/isAdmin.middleware";
import IsNotAuth from "@/middlewares/isNotAuth.middleware";
import { FindOneInstructor } from "@/services/Instructor";
import theme from "@/theme/themeConfig";
import { getTokenCookie } from "@/utils/cookie.util";
import { Scheduler } from "@aldabil/react-scheduler";
import { ConfigProvider } from "antd";
import { InstructorI } from "@/interfaces/instructor.interface";
import { useMyContext } from "@/context/MainContext";

export default function InstructorAvailability({ params }: { params: { id: string } }) {
  const [instructorProfile, setInstructorProfile] = useState<InstructorI>();
  const { availabilities, setAvailabilities } = useMyContext();

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const token = getTokenCookie();

        if(token) {
          const res: InstructorI = await FindOneInstructor(token, params.id);

          document.title = `Instructor | ${res.firstName} ${res.lastName}`;
          setInstructorProfile(res);
          setAvailabilities(res.availability.map((item: any) => {
            return {
              event_id: item._id,
              title: `${res.firstName} ${res.lastName}`,
              start: new Date(item.startDate),
              end: new Date(item.endDate),
            }
          }));
        }
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      }
    };

    fetchInstructor();
  }, []);

  return (
    <IsNotAuth>
      <IsAdmin>
        <ConfigProvider theme={theme}>
          <Header />
          <main className="w-full h-auto p-2 mt-8 flex justify-center">
            <div className="w-full sm:w-9/12 lg:w-[60rem] relative mb-28">
              {instructorProfile && (<>
                <div className="w-full">
                  <h2 className="text-3xl font-semibold text-honeydew capitalize">
                    {instructorProfile.firstName} {instructorProfile.lastName}
                  </h2>
                  <span className="text-base lg:text-lg font-medium text-naples-yellow capitalize">
                    {instructorProfile.user.role}
                  </span>
                </div>
                <div className="w-full mt-10">
                  <AddAvailability id={params.id} />
                  <Scheduler
                    view="week"
                    editable={false}
                    draggable={true}
                    deletable={true}
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
                    events={availabilities}
                  />
                </div>
              </>)}
            </div>
          </main>
        </ConfigProvider>
      </IsAdmin>
    </IsNotAuth>
  );
};
