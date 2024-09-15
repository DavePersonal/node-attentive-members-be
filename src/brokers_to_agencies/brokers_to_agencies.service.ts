import { Injectable } from '@nestjs/common';
import {BaseService} from '../common/base.service';
import {brokers, brokers_to_agencies} from '@prisma/client';
import {IService} from '../common/interfaces/service.interface';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class BrokersToAgenciesService extends BaseService<brokers_to_agencies> implements IService<brokers_to_agencies> {
    constructor(prismaService: PrismaService) {
        super(prismaService, prismaService.brokers_to_agencies);
    }

    async findAll(): Promise<brokers_to_agencies[]> {
        return super.findAll();
    }

    async findOne(id: number): Promise<brokers_to_agencies | null> {
        return super.findOne(id);
    }

    async create(data: brokers_to_agencies): Promise<brokers_to_agencies> {
        return super.create(data);
    }

    async update(id: number, data: brokers_to_agencies): Promise<brokers_to_agencies> {
        return super.update(id, data);
    }

    async delete(id: number): Promise<brokers_to_agencies> {
        return super.delete(id);
    }
}

