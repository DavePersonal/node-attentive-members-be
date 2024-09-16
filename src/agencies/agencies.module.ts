import { Module } from '@nestjs/common';
import {AgenciesService} from './agencies.service';
import {PrismaService} from '../prisma/prisma.service';
import {AgenciesController} from './agencies.controller';
import {BrokersToAgenciesService} from '../brokers_to_agencies/brokers_to_agencies.service';

@Module({
    providers: [AgenciesService, BrokersToAgenciesService, PrismaService],
    controllers: [AgenciesController]
})
export class AgenciesModule {}
