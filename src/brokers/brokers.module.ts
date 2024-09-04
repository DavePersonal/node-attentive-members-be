import { Module } from '@nestjs/common';
import { BrokersService } from './brokers.service';
import { BrokersController } from './brokers.controller';
import {PrismaService} from '../prisma/prisma.service';

@Module({
  providers: [BrokersService, PrismaService],
  controllers: [BrokersController]
})
export class BrokersModule {}
