import {IController} from './interfaces/controller.interface'
import {BaseService, PaginatedResult} from './base.service'
import {Body, Param, ParseIntPipe} from '@nestjs/common'
import {IQueryFilter, QueryFilter} from '../shared/decorators/query-filter.decorator'
import {QueryPage} from '../shared/decorators/query-page.decorator'
import {QuerySize} from '../shared/decorators/query-limit.decorator'
import {IQueryInclude, QueryInclude} from '../shared/decorators/query-include.decorator'

export class BaseController<T> implements IController <T> {
    constructor(private readonly baseService: BaseService<T>) {
    }

    async findAll(@QueryFilter() filter: IQueryFilter, @QueryInclude() include: IQueryInclude, @QueryPage() page: number, @QuerySize() size: number): Promise<PaginatedResult<T>> {
        return await this.baseService.findAll(filter, include, page, size)
    }

    async findOne(@Param('id', ParseIntPipe) id: number): Promise<T> {
        return await this.baseService.findOne(id)
    }

    async create(@Body() data: T): Promise<T> {
        return await this.baseService.create(data)
    }

    async update(@Param('id') id: number, @Body() data: T): Promise<T> {
        return await this.baseService.update(id, data)
    }

    async delete(@Param('id') id: number): Promise<{success:boolean}> {
        await this.baseService.delete(id)
        return {success: true}
    }
}
