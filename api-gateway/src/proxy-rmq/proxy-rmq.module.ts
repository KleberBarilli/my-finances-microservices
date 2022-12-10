import { Module } from '@nestjs/common';
import { ClientProxyMyFinances } from './client-proxy';

@Module({
  providers: [ClientProxyMyFinances],
  exports: [ClientProxyMyFinances],
})
export class ProxyRMQModule {}
