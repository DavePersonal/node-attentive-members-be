import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Req,
    Res,
    Param,
    Body,
} from '@nestjs/common';
import { Request, Response } from 'express';
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
    async findAll(@Req() req: Request, @Res() res: Response): Promise<void> {
        return super.findAll(req, res);
    }

    @Get(':id')
    async findOne(@Param('id') id: number, @Res() res: Response): Promise<void> {
        return super.findOne(id, res);
    }

    @Post()
    async create(@Body() data: invoices_draft, @Res() res: Response): Promise<void> {
        return super.create(data, res);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: invoices_draft,
        @Res() res: Response,
    ): Promise<void> {
        return super.update(id, data, res);
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response): Promise<void> {
        return super.delete(id, res);
    }
}
