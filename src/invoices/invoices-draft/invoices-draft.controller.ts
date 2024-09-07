import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Req,
    Param,
    Body,
} from '@nestjs/common';
import { Request } from 'express';
import { InvoicesDraftService } from './invoices-draft.service';
import { BaseController } from '../../common/base.controller';
import { IController } from '../../common/interfaces/controller.interface';
import { invoices_draft } from '@prisma/client';

@Controller('invoices-draft')
export class InvoicesDraftController
    extends BaseController<invoices_draft>
    implements IController<invoices_draft>
{
    constructor(private readonly invoicesDraftService: InvoicesDraftService) {
        super(invoicesDraftService);
    }

    @Get()
    async findAll(@Req() req: Request): Promise<invoices_draft[]> {
        return super.findAll(req);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<invoices_draft> {
        return super.findOne(id);
    }

    @Post()
    async create(@Body() data: invoices_draft): Promise<invoices_draft> {
        return super.create(data);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: invoices_draft,
    ): Promise<invoices_draft> {
        return super.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return super.delete(id);
    }
}
