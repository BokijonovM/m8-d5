interface IPayload {
  role: string;
  _id: string;
}

export interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  password?: string;
  role: string;
  token?: string;
}

export interface tokenT {
  token: string;
}

export type IRole = "Host" | "Guest" | "admin";

export interface JWTPayload {
  _id: ObjectId;
  role: IRole;
}
export interface UserRole {
  user: string;
  role: IRole;
}
declare namespace Express {
  export interface user {
    role?: string;
  }
}
