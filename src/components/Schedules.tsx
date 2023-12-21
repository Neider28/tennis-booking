'use client'
import { Scheduler } from "@aldabil/react-scheduler";
import AddSchedule from "./AddSchedule";
import { useEffect, useState } from "react";
import { FindAllSchedule } from "@/services/Schedule";
import { getTokenCookie } from "@/utils/cookie.util";
import { useMyContext } from "@/context/MainContext";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { useRouter } from "next/navigation";

export default function Schedules() {
  const [isCompany, setIsCompany] = useState(false);
  const [role, setRole] = useState(null);
  const { schedules, setSchedules } = useMyContext();
  const router = useRouter();

  useEffect(() => {
    try {
      const schedules = async (token: string) => {
        const data = await FindAllSchedule(token);

        setSchedules(data.map((item: any) => {
          return {
            event_id: item._id,
            title: item.title,
            start: new Date(item.startDate),
            end: new Date(item.endDate),
          }
        }));
      };

      const token = getTokenCookie();

      if(token) {
        schedules(token);

        const decoded = jwt.decode(token) as JwtPayload;
    
        if ('role' in decoded) {
          const role = decoded.role;
          setRole(role);
    
          if (role === 'company') {
            setIsCompany(true);
          } else {
            setIsCompany(false);
          }
        }
      }
    } catch (error) {
      
    }
  }, []);

  return (<>
    {isCompany && (
      <AddSchedule />
    )}
    {role && (
      <Scheduler
        view="week"
        editable={false}
        draggable={false}
        deletable={false}
        onEventClick={(e) => router.push(role === 'company' ? `/dashboard/admin/schedule-detail/${e.event_id}` : `/dashboard/schedule-detail/${e.event_id}`)}
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
    )}
  </>)
}
