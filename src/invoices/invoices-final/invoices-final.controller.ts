import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body, ParseIntPipe,
} from '@nestjs/common'
import {InvoicesFinalService} from './invoices-final.service'
import {BaseController} from '../../common/base.controller'
import {IController} from '../../common/interfaces/controller.interface'
import {invoices_final} from '@prisma/client'
import {IQueryFilter, QueryFilter} from '../../shared/decorators/query-filter.decorator'
import {QueryPage} from '../../shared/decorators/query-page.decorator'
import {QuerySize} from '../../shared/decorators/query-limit.decorator'
import {PaginatedResult} from '../../common/base.service'

@Controller('invoices-final')
export class InvoicesFinalController extends BaseController<invoices_final> implements IController<invoices_final> {
    constructor(private readonly invoicesFinalService: InvoicesFinalService) {
        super(invoicesFinalService)
    }

    @Get()
    async findAll(@QueryFilter() filter: IQueryFilter, @QueryPage() page: number, @QuerySize() size: number): Promise<PaginatedResult<invoices_final>> {
        return super.findAll(filter, page, size)
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<invoices_final> {
        return super.findOne(id)
    }

    @Post()
    async create(@Body() data: invoices_final): Promise<invoices_final> {
        return super.create(data)
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: invoices_final,
    ): Promise<invoices_final> {
        return super.update(id, data)
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<{success:boolean}> {
        return super.delete(id)
    }
}
