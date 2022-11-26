import {
  Body,
  Controller,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateInvestimentDto } from './investiments/dto/create-investiment.dto';
import { CreateUserDto } from './users/create-user.dto';

@Controller('api')
export class AppController {
  private logger = new Logger(AppController.name);

  private clientUserBackend: ClientProxy;

  constructor() {
    this.clientUserBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_URL}/users`,
        ],
        queue: 'user-backend',
      },
    });
  }
  // @Post('investiments')
  // @UsePipes(ValidationPipe)
  // async createInvestiment(@Body() createInvestimentDto: CreateInvestimentDto) {
  //   return await this.clientUserBackend.emit(
  //     'create-investiment',
  //     createInvestimentDto,
  //   );
  // }
  @Post('users')
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.clientUserBackend.emit('create-user', createUserDto);
  }
}
