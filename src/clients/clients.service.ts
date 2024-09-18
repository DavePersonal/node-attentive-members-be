import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {BaseService, PaginatedResult} from '../common/base.service'
import { IService } from '../common/interfaces/service.interface';
import { clients } from '@prisma/client';
import {IQueryFilter} from '../shared/decorators/query-filter.decorator'
import {IQueryInclude} from '../shared/decorators/query-include.decorator' // Import the Prisma model type

@Injectable()
export class ClientsService extends BaseService<clients> implements IService<clients> {
    constructor(prismaService: PrismaService) {
        super(prismaService, prismaService.clients);
    }

    async findAll(filter?: IQueryFilter, include?: IQueryInclude, page?: number, size?: number): Promise<PaginatedResult<clients>> {
        return super.findAll(filter, include, page, size);
    }

    async findOne(id: number): Promise<clients | null> {
        return super.findOne(id);
    }

    async create(data: clients): Promise<clients> {
        return super.create(data);
    }

    async update(id: number, data: clients): Promise<clients> {
        return super.update(id, data);
    }

    async delete(id: number): Promise<clients> {
        return super.delete(id);
    }
}
