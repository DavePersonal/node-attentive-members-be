import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {BaseService, PaginatedResult} from '../common/base.service'
import { IService } from '../common/interfaces/service.interface';
import { brokers } from '@prisma/client';
import {IQueryFilter} from '../shared/decorators/query-filter.decorator' // Import the Prisma model type

@Injectable()
export class BrokersService extends BaseService<brokers> implements IService<brokers> {
    constructor(prismaService: PrismaService) {
        super(prismaService, prismaService.brokers);
    }

    async findAll(filter?: IQueryFilter, page?: number, size?: number): Promise<PaginatedResult<brokers>> {
        return super.findAll(filter, page, size)
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
