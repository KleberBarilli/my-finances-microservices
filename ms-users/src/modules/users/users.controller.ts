import { Controller, Logger } from "@nestjs/common";
import { UsersService } from "./users.service";
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from "@nestjs/microservices";
import { User } from "@prisma/client";

const ackErrors: string[] = ["Unique constraint failed on the field"];

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  logger = new Logger(UsersController.name);

  @EventPattern("create-user")
  async create(@Payload() user: User, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    this.logger.log(`user: ${JSON.stringify(user)}`);

    try {
      await this.usersService.create(user);
      await channel.ack(originalMessage); //Removendo mensagem do rabbit após sucesso de escrita no banco
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error)}`);

      const filterAckError = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );
      if (filterAckError) {
        await channel.ack(originalMessage);
      }
    }
  }

  @MessagePattern("find-users")
  async listUsers(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      if (id) {
        return await this.usersService.findById(id);
      }
      return await this.usersService.listAll();
    } finally {
      await channel.ack(originalMessage);
    }
  }
}
