import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { ProxyRMQModule } from "../../proxy-rmq/proxy-rmq.module";

@Module({
  imports: [ProxyRMQModule],
  controllers: [UsersController],
})
export class UsersModule {}
