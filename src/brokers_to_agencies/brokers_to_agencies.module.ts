import { Module } from '@nestjs/common';
import {BrokersToAgenciesController} from './brokers_to_agencies.controller';
import {PrismaService} from '../prisma/prisma.service';
import {BrokersToAgenciesService} from './brokers_to_agencies.service';

@Module({
    providers: [BrokersToAgenciesService, PrismaService],
    controllers: [BrokersToAgenciesController]
})
export class BrokersToAgenciesModule {}
