import { Module } from '@nestjs/common';
import { ClientProxyFinanceManagement } from './client-proxy';

@Module({
  providers: [ClientProxyFinanceManagement],
  exports: [ClientProxyFinanceManagement],
})
export class ProxyRMQModule {}
