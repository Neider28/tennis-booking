import { InstructorI } from "./instructor.interface";

export interface ConfirmI {
  startDate: number;
  endDate: number;
  length: number;
  cost: number;
  instructor: InstructorI;
};