"use client"
import { ClassI } from "@/interfaces/class.interface";
import { CompanyI } from "@/interfaces/company.interface";
import { EventI } from "@/interfaces/event.interface";
import { InstructorI, InstructorTableI } from "@/interfaces/instructor.interface";
import { StudentI } from "@/interfaces/student.interface";
import React, { useContext, createContext, useState} from "react";

type ContextType = {
  schedules: EventI[],
  setSchedules: React.Dispatch<React.SetStateAction<EventI[]>>,
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
};

const MyContext = createContext<ContextType | undefined>(undefined);

export interface ContextProps {
	children: React.ReactNode,
};

export function MainContext({ children }: ContextProps) {
  const [schedules, setSchedules] = useState<EventI[]>([]);
  const [instructorsTable, setInstructorsTable] = useState<InstructorTableI[]>([]);
  const [classItem, setClassItem] = useState<ClassI | undefined>();
  const [profile, setProfile] = useState<StudentI | CompanyI | InstructorI | undefined>();
  const [availabilities, setAvailabilities] = useState<EventI[]>([]);
  const [company, setCompany] = useState<CompanyI | undefined>();
  const [classes, setClasses] = useState<ClassI[]>([]);

  return (
    <MyContext.Provider value={{
      schedules,
      setSchedules,
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
