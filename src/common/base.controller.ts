// src/common/base.controller.ts

import { Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BaseService } from './base.service';

export class BaseController<T> {
    constructor(private readonly baseService: BaseService<T>) {}

    @Get()
    async findAll(): Promise<T[]> {
        return this.baseService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<T> {
        return this.baseService.findOne(id);
    }

    @Post()
    async create(@Body() data: T): Promise<T> {
        return this.baseService.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: T): Promise<T> {
        return this.baseService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<T> {
        return this.baseService.delete(id);
    }
}
