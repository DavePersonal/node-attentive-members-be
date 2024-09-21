import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common'
import {BaseController} from '../common/base.controller'
import {brokers_to_agencies} from '@prisma/client'
import {IController} from '../common/interfaces/controller.interface'
import {BrokersToAgenciesService} from './brokers_to_agencies.service'
import {IQueryFilter, QueryFilter} from '../shared/decorators/query-filter.decorator'
import {QueryPage} from '../shared/decorators/query-page.decorator'
import {QuerySize} from '../shared/decorators/query-limit.decorator'
import {PaginatedResult} from '../common/base.service'
import {IQueryInclude, QueryInclude} from '../shared/decorators/query-include.decorator'

@Controller('brokers-to-agencies')
export class BrokersToAgenciesController extends BaseController<brokers_to_agencies> implements IController<brokers_to_agencies> {
    constructor(private readonly brokersToAgenciesService: BrokersToAgenciesService) {
        super(brokersToAgenciesService)
    }

    @Get()
    async findAll(@QueryFilter() filter: IQueryFilter, @QueryInclude() include: IQueryInclude, @QueryPage() page: number, @QuerySize() size: number): Promise<PaginatedResult<brokers_to_agencies>> {
        return super.findAll(filter, include, page, size)
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<brokers_to_agencies> {
        return super.findOne(id)
    }

    @Post()
    async create(@Body() data: brokers_to_agencies): Promise<brokers_to_agencies> {
        return super.create(data)
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: brokers_to_agencies): Promise<brokers_to_agencies> {
        return super.update(id, data)
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<{success:boolean}> {
        return super.delete(id)
    }
}
