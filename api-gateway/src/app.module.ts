import { Module } from "@nestjs/common";
import { UsersController } from "./modules/users/users.controller";
import { ConfigModule } from "@nestjs/config";
import { ProxyRMQModule } from "./proxy-rmq/proxy-rmq.module";
import { ClientProxyMyFinances } from "./proxy-rmq/client-proxy";
import { InvestimentsController } from "./modules/investiments/investiments.controller";

@Module({
  imports: [ConfigModule.forRoot(), ProxyRMQModule],
  controllers: [UsersController, InvestimentsController],
  providers: [ClientProxyMyFinances],
})
export class AppModule {}
