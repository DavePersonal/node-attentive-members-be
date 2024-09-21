import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import {PrismaService} from '../prisma/prisma.service';
import {BrokersToAgenciesService} from '../brokers_to_agencies/brokers_to_agencies.service'
import {ClientsToBrokersService} from '../clients_to_brokers/clients_to_brokers.service'

@Module({
  providers: [ClientsService, PrismaService, BrokersToAgenciesService, ClientsToBrokersService],
  controllers: [ClientsController]
})
export class ClientsModule {}
