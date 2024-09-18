import {Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe} from '@nestjs/common'
import {BrokersService} from './brokers.service'
import {BaseController} from '../common/base.controller'
import {IController} from '../common/interfaces/controller.interface'
import {brokers} from '@prisma/client'
import {IQueryFilter, QueryFilter} from '../shared/decorators/query-filter.decorator'
import {QueryPage} from '../shared/decorators/query-page.decorator'
import {QuerySize} from '../shared/decorators/query-limit.decorator'
import {PaginatedResult} from '../common/base.service'
import {IQueryInclude, QueryInclude} from '../shared/decorators/query-include.decorator'

@Controller('brokers')
export class BrokersController extends BaseController<brokers> implements IController<brokers> {
    constructor(private readonly brokersService: BrokersService) {
        super(brokersService)
    }

    @Get()
    async findAll(@QueryFilter() filter: IQueryFilter, @QueryInclude() include: IQueryInclude, @QueryPage() page: number, @QuerySize() size: number): Promise<PaginatedResult<brokers>> {
        return super.findAll(filter, include, page, size)
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<brokers> {
        return super.findOne(id)
    }

    @Post()
    async create(@Body() data: brokers): Promise<brokers> {
        return super.create(data)
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: brokers): Promise<brokers> {
        return super.update(id, data)
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<{success:boolean}> {
        return super.delete(id)
    }
}
