import { Module } from '@nestjs/common';
import { ClientsToBrokersController } from './clients_to_brokers.controller';
import { ClientsToBrokersService } from './clients_to_brokers.service';
import {PrismaService} from '../prisma/prisma.service';

@Module({
  providers: [ClientsToBrokersService, PrismaService],
  controllers: [ClientsToBrokersController]
})
export class ClientsToBrokersModule {}
