import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";

import { Injectable } from "@nestjs/common";

interface RabbitConnection {
  name: "users" | "investiments";
}

@Injectable()
export class ClientProxyMyFinances {
  getClientProxyUserBackendInstance(name: RabbitConnection): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,

      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_URL}/${name}`,
        ],

        queue: "user-backend",
      },
    });
  }
}
