import { ClassI } from "./class.interface";
import { InstructorI } from "./instructor.interface";
import { ScheduleI } from "./schedule.interface";
import { StudentI } from "./student.interface";

export interface CreatePaymentI {
  instructor: string;
  emailInstructor: string;
  student: string;
  emailStudent: string;
  cost: number;
  class: string;
  schedule: string;
};

export interface PaymentI {
  _id: string;
  instructor: InstructorI;
  emailInstructor: string;
  student: StudentI;
  emailStudent: string;
  isPaid: boolean;
  cost: number;
  class: ClassI;
  schedule: ScheduleI;
  createdAt: Date;
  updatedAt: Date;
};