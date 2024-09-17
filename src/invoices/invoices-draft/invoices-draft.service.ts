// src/invoices/invoices-draft.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {BaseService, PaginatedResult} from '../../common/base.service'
import { IService } from '../../common/interfaces/service.interface';
import { invoices_draft } from '@prisma/client';
import {IQueryFilter} from '../../shared/decorators/query-filter.decorator' // Import the Prisma model type

@Injectable()
export class InvoicesDraftService
    extends BaseService<invoices_draft>
    implements IService<invoices_draft>
{
    constructor(prismaService: PrismaService) {
        super(prismaService, prismaService.invoices_draft);
    }

    // Retrieve all draft invoices
    async findAll(filter?: IQueryFilter, page?: number, size?: number): Promise<PaginatedResult<invoices_draft>> {
        return super.findAll(filter, page, size)
    }

    // Retrieve a single draft invoice by ID
    async findOne(id: number): Promise<invoices_draft | null> {
        return super.findOne(id);
    }

    // Create a new draft invoice
    async create(data: invoices_draft): Promise<invoices_draft> {
        return super.create(data);
    }

    // Update an existing draft invoice by ID
    async update(id: number, data: invoices_draft): Promise<invoices_draft> {
        return super.update(id, data);
    }

    // Delete a draft invoice by ID
    async delete(id: number): Promise<invoices_draft> {
        return super.delete(id);
    }
}
