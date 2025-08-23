export const Role = {
  USER: "user",
  AGENT: "agent",
  ADMIN: "admin",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export interface IUser {
  _id?: string;

  name: string;
  phone: string;
  email?: string;

  pin: string;
  role: Role;

  isBlocked: boolean;
  isAgentApproved?: boolean;
  isDeleted?: boolean;

  picture?: string;
  address?: string;

  commissionRate?: number;
  permissionLevel?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export type UpdateProfileResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUser;
};
