import { Module } from '@nestjs/common';
import {AgenciesService} from './agencies.service';
import {PrismaService} from '../prisma/prisma.service';
import {AgenciesController} from './agencies.controller';

@Module({
    providers: [AgenciesService, PrismaService],
    controllers: [AgenciesController]
})
export class AgenciesModule {}
