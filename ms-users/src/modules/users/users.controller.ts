import { Controller, Logger } from "@nestjs/common";
import { UsersService } from "./users.service";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { UserEntity } from "./entities/user.entity";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  logger = new Logger(UsersController.name);

  @EventPattern("create-user")
  async create(@Payload() user: UserEntity) {
    this.logger.log(`user: ${JSON.stringify(user)}`);

    return await this.usersService.create(user);
  }

  @MessagePattern("find-users")
  async listUsers(@Payload() id: string) {
    if (id) {
      return await this.usersService.findById(id);
    }
    return await this.usersService.listAll();
  }
}
