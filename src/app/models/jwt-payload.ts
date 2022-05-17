export interface JwtPayload {
  user: {
    id: number;
    name: string;
    role: string;
  };
  iat: number;
}
