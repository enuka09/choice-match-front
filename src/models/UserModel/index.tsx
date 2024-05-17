export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  phone: number;
  dob?: string;
  gender?: string;
  isAdmin: string;
  activeState?: boolean;
}
