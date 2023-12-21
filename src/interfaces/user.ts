export interface ProfileI {
  _id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  address?: string;
  user: {
    email: string;
    role: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  banner: string;
  profileImage: string;
  logo: string;
  createdAt: Date;
  updatedAt: Date;
}
