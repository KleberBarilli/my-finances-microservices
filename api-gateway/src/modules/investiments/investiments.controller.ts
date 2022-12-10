import {
  Body,
  Controller,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { ClientProxyMyFinances } from "src/proxy-rmq/client-proxy";
import { CreateInvestimentDto } from "./dtos/create-investiment.dto";

@Controller("api/investiments")
export class InvestimentsController {
  private logger = new Logger(InvestimentsController.name);

  constructor(private clientProxyMyFinances: ClientProxyMyFinances) {}

  private clientInvestimentsBackend =
    this.clientProxyMyFinances.getClientProxyUserBackendInstance({
      name: "investiments",
    });

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createInvestimentDto: CreateInvestimentDto) {
    console.log(createInvestimentDto);
    this.logger.log(
      `createInvestimentDto: ${JSON.stringify(createInvestimentDto)}`,
    );
    this.clientInvestimentsBackend.emit(
      "create-investiment",
      createInvestimentDto,
    );
  }

  // @Get('investiments')
  // listInvestiments(@Query('investimentId') id: string): Observable<any> {
  //   return this.clientUserBackend.send('list-investiments', id ? id : '');
  // }
  //   @Get()
  //   listUsers(@Query("userId") id: string): Observable<any> {
  //     return this.clientUserBackend.send("find-users", id ? id : "");
  //   }
}
