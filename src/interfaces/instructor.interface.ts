import { AvailabilityI } from "./availability.interface";
import { SignInUserI, UserI } from "./user.interface";

export interface InstructorI {
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
  availability: AvailabilityI[];
};

export interface InstructorTableI {
  key: React.Key,
  firstName: string,
  lastName: string,
  phone: string,
  address: string,
  email: string,
};

export interface CreateInstructorI {
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
  address: string;
  user: SignInUserI;
};

export interface UpdateInstructorI {
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  address?: string;
};
