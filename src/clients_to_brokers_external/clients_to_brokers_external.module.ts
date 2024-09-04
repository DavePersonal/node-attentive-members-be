import { Module } from '@nestjs/common';
import { ClientsToBrokersExternalService } from './clients_to_brokers_external.service';
import { ClientsToBrokersExternalController } from './clients_to_brokers_external.controller';
import {PrismaService} from '../prisma/prisma.service';

@Module({
  providers: [ClientsToBrokersExternalService, PrismaService],
  controllers: [ClientsToBrokersExternalController]
})
export class ClientsToBrokersExternalModule {}
