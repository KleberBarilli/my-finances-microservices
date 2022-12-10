import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class InvestimentsService {
  private readonly logger = new Logger(InvestimentsService.name);

  create(investiment: any) {
    console.log(investiment);
  }
}
