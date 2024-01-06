import { SignInUserI, UserI } from "./user.interface";

export interface StudentI {
  _id: string;
  banner: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserI;
};

export interface SignUpStudentI {
  firstName: string;
  lastName: string;
  user: SignInUserI;
};

export interface UpdateStudentI {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
};
