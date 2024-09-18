import { Module } from '@nestjs/common';
import { ClientsToBrokersController } from './clients_to_brokers.controller';
import { ClientsToBrokersService } from './clients_to_brokers.service';
import {PrismaService} from '../prisma/prisma.service';
import {ClientsService} from '../clients/clients.service'

@Module({
  providers: [ClientsToBrokersService, PrismaService, ClientsService],
  controllers: [ClientsToBrokersController]
})
export class ClientsToBrokersModule {}
