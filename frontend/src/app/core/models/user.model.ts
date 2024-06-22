export interface User {
  username: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  googleId?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  subscription: Boolean;
  startDate?: Date;
  endDate?: Date;
  token?: string;
}
