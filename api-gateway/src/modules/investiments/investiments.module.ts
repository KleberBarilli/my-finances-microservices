import { Module } from "@nestjs/common";
import { InvestimentsController } from "./investiments.controller";
import { ProxyRMQModule } from "../../proxy-rmq/proxy-rmq.module";

@Module({
  imports: [ProxyRMQModule],
  controllers: [InvestimentsController],
})
export class InvestimentsModule {}
