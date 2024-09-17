import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body, ParseIntPipe,
} from '@nestjs/common'
import {BaseController} from '../common/base.controller'
import {IController} from '../common/interfaces/controller.interface'
import {clients_to_brokers_external} from '@prisma/client'
import {ClientsToBrokersExternalService} from './clients_to_brokers_external.service'
import {IQueryFilter, QueryFilter} from '../shared/decorators/query-filter.decorator'
import {QueryPage} from '../shared/decorators/query-page.decorator'
import {QuerySize} from '../shared/decorators/query-limit.decorator'
import {PaginatedResult} from '../common/base.service'

@Controller('clients-to-brokers-external')
export class ClientsToBrokersExternalController extends BaseController<clients_to_brokers_external> implements IController<clients_to_brokers_external> {
    constructor(private readonly clientsToBrokersExternalService: ClientsToBrokersExternalService) {
        super(clientsToBrokersExternalService)
    }

    @Get()
    async findAll(@QueryFilter() filter: IQueryFilter, @QueryPage() page: number, @QuerySize() size: number): Promise<PaginatedResult<clients_to_brokers_external>> {
        return super.findAll(filter, page, size)
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<clients_to_brokers_external> {
        return super.findOne(id)
    }

    @Post()
    async create(@Body() data: clients_to_brokers_external): Promise<clients_to_brokers_external> {
        return super.create(data)
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: clients_to_brokers_external,
    ): Promise<clients_to_brokers_external> {
        return super.update(id, data)
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<{success:boolean}> {
        return super.delete(id)
    }
}
