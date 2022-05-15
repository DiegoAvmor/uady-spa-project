export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

interface UserRole {
  id: number;
  name: string;
}
