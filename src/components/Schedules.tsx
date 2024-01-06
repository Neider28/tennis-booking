"use client"
import { Scheduler } from "@aldabil/react-scheduler";
import AddSchedule from "./AddSchedule";
import { useEffect, useState } from "react";
import { getTokenCookie } from "@/utils/cookie.util";
import { useMyContext } from "@/context/MainContext";
import { MyProfile } from "@/services/Auth";
import { FindOneCompany } from "@/services/Company";
import NotFound from "./NotFound";
import { CompanyI } from "@/interfaces/company.interface";

export default function Schedules() {
  const { schedules, setSchedules } = useMyContext();
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const token = getTokenCookie();

        if(token) {
          const profile = await MyProfile(token);
          const res: CompanyI = await FindOneCompany(token, profile._id);

          setSchedules(res.classes.flatMap((item1: any) => {
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
        setError(true);
      }
    };

    fetchSchedules();
  }, []);

  return (<>
    {!error && (
      <div className="w-full">
        <AddSchedule />
        <Scheduler
          view="week"
          editable={false}
          draggable={false}
          deletable={false}
          // onEventClick={(e) => router.push(role === "company" ? `/dashboard/admin/schedule-detail/${e.event_id}` : `/dashboard/schedule-detail/${e.event_id}`)}
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
          events={schedules}
        />
      </div>
    )}
    {error && (
      <div className='h-fit w-full'>
        <NotFound />
      </div>
    )}
  </>);
};
