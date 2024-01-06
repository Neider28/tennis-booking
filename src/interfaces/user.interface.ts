export interface UserI {
  _id: string;
  role: string;
  email: string;
  password: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface SignInUserI {
  email: string;
  password: string;
};
