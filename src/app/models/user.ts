import { UserRole } from "./user-role";

export interface User {
  id?: number;
  name: string;
  password: string;
  email: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
