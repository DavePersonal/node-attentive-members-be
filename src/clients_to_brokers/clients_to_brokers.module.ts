import { Module } from '@nestjs/common';
import { ClientsToBrokersController } from './clients_to_brokers.controller';
import { ClientsToBrokersService } from './clients_to_brokers.service';

@Module({
  controllers: [ClientsToBrokersController],
  providers: [ClientsToBrokersService]
})
export class ClientsToBrokersModule {}
