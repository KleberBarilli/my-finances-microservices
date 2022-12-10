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

import { Observable } from 'rxjs';
import { ClientProxyMyFinances } from 'src/proxy-rmq/client-proxy';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Controller('api/users')
export class UsersController {
  private logger = new Logger(UsersController.name);

  constructor(private clientProxyMyFinances: ClientProxyMyFinances) {}

  private clientUserBackend =
    this.clientProxyMyFinances.getClientProxyUserBackendInstance();

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`createUserDto: ${JSON.stringify(createUserDto)}`);
    this.clientUserBackend.emit('create-user', createUserDto);
  }

  // @Get('investiments')
  // listInvestiments(@Query('investimentId') id: string): Observable<any> {
  //   return this.clientUserBackend.send('list-investiments', id ? id : '');
  // }
  @Get()
  listUsers(@Query('userId') id: string): Observable<any> {
    return this.clientUserBackend.send('find-users', id ? id : '');
  }
}
