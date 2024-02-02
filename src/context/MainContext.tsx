"use client"
import { ClassI } from "@/interfaces/class.interface";
import { CompanyI } from "@/interfaces/company.interface";
import { ConfirmI } from "@/interfaces/confirm.interface";
import { EventI } from "@/interfaces/event.interface";
import { InstructorI, InstructorTableI } from "@/interfaces/instructor.interface";
import { StudentI } from "@/interfaces/student.interface";
import React, { useContext, createContext, useState} from "react";

type ContextType = {
  schedules: EventI[],
  setSchedules: React.Dispatch<React.SetStateAction<EventI[]>>,
  confirmDetails: ConfirmI | undefined,
  setConfirmDetails: React.Dispatch<React.SetStateAction<ConfirmI | undefined>>,
  mySchedule: EventI[],
  setMySchedule: React.Dispatch<React.SetStateAction<EventI[]>>,
  instructorsTable: InstructorTableI[],
  setInstructorsTable: React.Dispatch<React.SetStateAction<InstructorTableI[]>>,
  classItem: ClassI | undefined,
  setClassItem: React.Dispatch<React.SetStateAction<ClassI | undefined>>,
  profile: StudentI | CompanyI | InstructorI | undefined,
  setProfile: React.Dispatch<React.SetStateAction<StudentI | CompanyI | InstructorI | undefined>>,
  availabilities: EventI[],
  setAvailabilities: React.Dispatch<React.SetStateAction<EventI[]>>,
  company: CompanyI | undefined,
  setCompany: React.Dispatch<React.SetStateAction<CompanyI | undefined>>,
  classes: ClassI[],
  setClasses: React.Dispatch<React.SetStateAction<ClassI[]>>,
  disabled: boolean,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  isAvailable: boolean,
  setIsAvailable: React.Dispatch<React.SetStateAction<boolean>>,
  isConfirmOpen: boolean,
  setIsConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

const MyContext = createContext<ContextType | undefined>(undefined);

export interface ContextProps {
	children: React.ReactNode,
};

export function MainContext({ children }: ContextProps) {
  const [schedules, setSchedules] = useState<EventI[]>([]);
  const [confirmDetails, setConfirmDetails] = useState<ConfirmI | undefined>();
  const [mySchedule, setMySchedule] = useState<EventI[]>([]);
  const [instructorsTable, setInstructorsTable] = useState<InstructorTableI[]>([]);
  const [classItem, setClassItem] = useState<ClassI | undefined>();
  const [profile, setProfile] = useState<StudentI | CompanyI | InstructorI | undefined>();
  const [availabilities, setAvailabilities] = useState<EventI[]>([]);
  const [company, setCompany] = useState<CompanyI | undefined>();
  const [classes, setClasses] = useState<ClassI[]>([]);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  return (
    <MyContext.Provider value={{
      schedules,
      setSchedules,
      mySchedule,
      setMySchedule,
      instructorsTable,
      setInstructorsTable,
      classItem,
      setClassItem,
      profile,
      setProfile,
      availabilities,
      setAvailabilities,
      company,
      setCompany,
      classes,
      setClasses,
      disabled,
      setDisabled,
      isAvailable,
      setIsAvailable,
      isConfirmOpen,
      setIsConfirmOpen,
      confirmDetails,
      setConfirmDetails,
    }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("useYourContext debe usarse dentro de un YourContextProvider");
  }

  return context;
};
