import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientProxyMyFinances {
  getClientProxyUserBackendInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,

      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_URL}/users`,
        ],

        queue: 'user-backend',
      },
    });
  }
}
