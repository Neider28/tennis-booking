'use client'
import { ProfileI } from "@/interfaces/user";
import React, { useContext, createContext, useState} from "react";

type ContextType = {
  schedules: any[],
  setSchedules: React.Dispatch<React.SetStateAction<any[]>>,
  instructors: any[],
  setInstructors: React.Dispatch<React.SetStateAction<any[]>>,
  scheduleDetail: any,
  setScheduleDetail: React.Dispatch<React.SetStateAction<any>>,
  profile: any,
  setProfile: React.Dispatch<React.SetStateAction<any>>,
};

type Event = {
  event_id: string,
  title: string,
  start: Date,
  end: Date,
}

const MyContext = createContext<ContextType | undefined>(undefined);

export interface ContextProps {
	children: React.ReactNode,
};

export function MainContext({ children }: ContextProps) {
  const [schedules, setSchedules] = useState<Event[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [scheduleDetail, setScheduleDetail] = useState<any>(null);
  const [profile, setProfile] = useState<ProfileI>();

  return (
    <MyContext.Provider value={{
      schedules,
      setSchedules,
      instructors,
      setInstructors,
      scheduleDetail,
      setScheduleDetail,
      profile,
      setProfile,
    }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('useYourContext debe usarse dentro de un YourContextProvider');
  }

  return context;
};
