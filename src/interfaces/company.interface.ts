import { ClassI } from "./class.interface";
import { InstructorI } from "./instructor.interface";
import { StudentI } from "./student.interface";
import { SignInUserI, UserI } from "./user.interface";

export interface CompanyI {
  _id: string;
  banner: string;
  logo: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserI;
  students: StudentI[];
  classes: ClassI[];
  instructors: InstructorI[];
};

export interface SignUpCompanyI {
  name: string;
  user: SignInUserI;
};

export interface UpdateCompanyI {
  name: string;
};
