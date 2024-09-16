import {Request} from 'express'
import {IController} from './interfaces/controller.interface'
import {BaseService} from './base.service'
import {Body, HttpException, HttpStatus, Param, Req} from '@nestjs/common'
import {IQueryFilter, QueryFilter} from '../shared/decorators/query-filter.decorator'
import {QueryPage} from '../shared/decorators/query-page.decorator'
import {QuerySize} from '../shared/decorators/query-limit.decorator'

export class BaseController < T > implements IController < T > {
    constructor(private readonly baseService: BaseService < T > ) {}

    async findAll(@Req() req: Request): Promise < T[] > {
        try {
            const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
            const size = req.query.size ? parseInt(req.query.size as string, 10) : undefined;

            const data = await this.baseService.findAll(page, size);
            return data;
        } catch (error) {
            this.handleException(error);
        }
    }

    // async findAll(@QueryFilter() filter: IQueryFilter, @QueryPage() page: number, @QuerySize() size: number): Promise < T[] > {
    //     return await this.baseService.findAll(page, size)
    // }

    async findOne(@Param('id') id: number): Promise < T > {
        try {
            const data = await this.baseService.findOne(id);
            if (data) {
                return data;
            } else {
                throw new HttpException(`Resource with ID ${id} not found.`, HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            this.handleException(error);
        }
    }

    async create(@Body() data: T): Promise < T > {
        try {
            const createdData = await this.baseService.create(data);
            return createdData;
        } catch (error) {
            this.handleException(error);
        }
    }

    async update(@Param('id') id: number, @Body() data: T): Promise < T > {
        try {
            const updatedData = await this.baseService.update(id, data);
            if (updatedData) {
                return updatedData;
            } else {
                throw new HttpException(`Resource with ID ${id} not found for update.`, HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            this.handleException(error);
        }
    }

    async delete(@Param('id') id: number): Promise < void > {
        try {
            const result = await this.baseService.delete(id);
            if (result) {
                return;
            } else {
                throw new HttpException(`Resource with ID ${id} not found for deletion.`, HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            this.handleException(error);
        }
    }

    protected handleException(error: any): never {
        if (error instanceof HttpException) {
            throw error;
        } else {
            throw new HttpException('An unexpected error occurred.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
