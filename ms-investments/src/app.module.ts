import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InvestimentsController } from './app.controller';
import { InvestimentsService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [InvestimentsController],
  providers: [InvestimentsService],
})
export class AppModule {}
