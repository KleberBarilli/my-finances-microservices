import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
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
  createUser(@Body() createUserDto: CreateUserDto) {
    this.clientUserBackend.emit('create-user', createUserDto);
  }

  @Get('investiments')
  listInvestiments(@Query('investimentId') id: string): Observable<any> {
    return this.clientUserBackend.send('list-investiments', id ? id : '');
  }
}
