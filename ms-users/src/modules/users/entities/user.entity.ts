import { User, Role } from "@prisma/client";

export class UserEntity implements User {
  id: string;
  role: Role;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
