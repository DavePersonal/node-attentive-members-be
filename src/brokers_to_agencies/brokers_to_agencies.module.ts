import { Module } from '@nestjs/common';
import {BrokersToAgenciesController} from './brokers_to_agencies.controller';
import {PrismaService} from '../prisma/prisma.service';

@Module({
    providers: [BrokersToAgenciesController, PrismaService],
    controllers: [BrokersToAgenciesController]
})
export class BrokersToAgenciesModule {}
