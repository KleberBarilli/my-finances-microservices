import { Controller, Logger } from '@nestjs/common';
import { InvestimentsService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

const ackErrors: string[] = ['Unique constraint failed on the field'];

interface B3RealEstateFunds {
  company: string;
  asset: string;
  segment: string;
  code: string;
}
interface B3Stock {
  code: string;
  sector: string;
  subSector: string;
  segment: string;
}

interface Investiment {
  asset: B3RealEstateFunds | B3Stock;
}
@Controller('investiments')
export class InvestimentsController {
  constructor(private readonly investimentsService: InvestimentsService) {}

  logger = new Logger(InvestimentsController.name);

  @EventPattern('create-investiment')
  async create(
    @Payload() investiment: Investiment,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    this.logger.log(`user: ${JSON.stringify(investiment)}`);

    try {
      await this.investimentsService.create(investiment);
      await channel.ack(originalMessage);
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error)}`);

      const filterAckError = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );
      if (filterAckError) {
        await channel.ack(originalMessage);
      }
    }
  }
}
