import { Module } from '@nestjs/common';
import { ClientsToBrokersExternalService } from './clients_to_brokers_external.service';
import { ClientsToBrokersExternalController } from './clients_to_brokers_external.controller';

@Module({
  providers: [ClientsToBrokersExternalService],
  controllers: [ClientsToBrokersExternalController]
})
export class ClientsToBrokersExternalModule {}
