import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from '../common/base.service';
import { IService } from '../common/interfaces/service.interface';
import { brokers } from '@prisma/client'; // Import the Prisma model type

@Injectable()
export class BrokersService extends BaseService<brokers> implements IService<brokers> {
    constructor(prismaService: PrismaService) {
        super(prismaService, prismaService.brokers);
    }

    async findAll(): Promise<brokers[]> {
        return super.findAll();
    }

    async findOne(id: number): Promise<brokers | null> {
        return super.findOne(id);
    }

    async create(data: brokers): Promise<brokers> {
        return super.create(data);
    }

    async update(id: number, data: brokers): Promise<brokers> {
        return super.update(id, data);
    }

    async delete(id: number): Promise<brokers> {
        return super.delete(id);
    }
}
