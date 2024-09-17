import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Correct import path for PrismaService
import {BaseService, PaginatedResult} from '../common/base.service'
import { IService } from '../common/interfaces/service.interface';
import { members } from '@prisma/client';
import {IQueryFilter} from '../shared/decorators/query-filter.decorator' // Import the Prisma model type

@Injectable()
export class MembersService
    extends BaseService<members>
    implements IService<members>
{
    constructor(prismaService: PrismaService) {
        super(prismaService, prismaService.members);
    }

    async findAll(filter?: IQueryFilter, page?: number, size?: number): Promise<PaginatedResult<members>> {
        return super.findAll(filter, page, size);
    }

    async findOne(id: number): Promise<members | null> {
        return super.findOne(id);
    }

    async create(data: members): Promise<members> {
        return super.create(data);
    }

    async update(id: number, data: members): Promise<members> {
        return super.update(id, data);
    }

    async delete(id: number): Promise<members> {
        return super.delete(id);
    }
}
