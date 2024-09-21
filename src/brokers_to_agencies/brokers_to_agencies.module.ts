import { Module } from '@nestjs/common';
import {BrokersToAgenciesController} from './brokers_to_agencies.controller';
import {PrismaService} from '../prisma/prisma.service';
import {BrokersToAgenciesService} from './brokers_to_agencies.service';
import {EmailService} from '../common/email/email.service'

@Module({
    providers: [BrokersToAgenciesService, PrismaService, EmailService],
    controllers: [BrokersToAgenciesController]
})
export class BrokersToAgenciesModule {}
