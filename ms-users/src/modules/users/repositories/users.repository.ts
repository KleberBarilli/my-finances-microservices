import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { User } from "../interfaces/user.interface";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  public create(user: User): Promise<UserEntity> {
    return this.prisma.user.create({ data: user });
  }
  public findById(id: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }
  public findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany({});
  }
}
