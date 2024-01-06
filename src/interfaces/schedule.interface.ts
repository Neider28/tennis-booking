import { InstructorI } from "./instructor.interface";

export interface ScheduleI {
  _id: string;
  startDate: Date;
  endDate: Date;
  instructors: InstructorI[];
  createdAt: Date;
  updatedAt: Date;
};
