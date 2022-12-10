import { Injectable, Logger } from "@nestjs/common";
import { UsersRepository } from "./repositories/users.repository";
import { User } from "./interfaces/user.interface";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  private readonly logger = new Logger(UsersService.name);

  create(user: User) {
    try {
      return this.repository.create(user);
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }
  listAll() {
    try {
      return this.repository.findAll();
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  findById(id: string) {
    try {
      return this.repository.findById(id);
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }
}
