import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Correct import path for PrismaService
import {BaseService, PaginatedResult} from '../../common/base.service'
import { IService } from '../../common/interfaces/service.interface';
import { invoices_final } from '@prisma/client';
import {IQueryFilter} from '../../shared/decorators/query-filter.decorator' // Import the Prisma model type

@Injectable()
export class InvoicesFinalService
    extends BaseService<invoices_final>
    implements IService<invoices_final>
{
    constructor(prismaService: PrismaService) {
        super(prismaService, prismaService.invoices_final);
    }

    async findAll(filter?: IQueryFilter, page?: number, size?: number): Promise<PaginatedResult<invoices_final>> {
        return super.findAll(filter, page, size)
    }

    async findOne(id: number): Promise<invoices_final | null> {
        return super.findOne(id);
    }

    async create(data: invoices_final): Promise<invoices_final> {
        return super.create(data);
    }

    async update(id: number, data: invoices_final): Promise<invoices_final> {
        return super.update(id, data);
    }

    async delete(id: number): Promise<invoices_final> {
        return super.delete(id);
    }
}
