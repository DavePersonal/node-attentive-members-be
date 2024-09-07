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
import { InvoicesFinalService } from './invoices-final.service';
import { BaseController } from '../../common/base.controller';
import { IController } from '../../common/interfaces/controller.interface';
import { invoices_final } from '@prisma/client';

@Controller('invoices-final')
export class InvoicesFinalController
    extends BaseController<invoices_final>
    implements IController<invoices_final>
{
    constructor(private readonly invoicesFinalService: InvoicesFinalService) {
        super(invoicesFinalService);
    }

    @Get()
    async findAll(@Req() req: Request): Promise<invoices_final[]> {
        return super.findAll(req);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<invoices_final> {
        return super.findOne(id);
    }

    @Post()
    async create(@Body() data: invoices_final): Promise<invoices_final> {
        return super.create(data);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: invoices_final
    ): Promise<invoices_final> {
        return super.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return super.delete(id);
    }
}
