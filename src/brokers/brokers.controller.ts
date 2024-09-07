import { Controller, Get, Post, Put, Delete, Req, Param, Body } from '@nestjs/common';
import { Request } from 'express';
import { BrokersService } from './brokers.service';
import { BaseController } from '../common/base.controller';
import { IController } from '../common/interfaces/controller.interface';
import { brokers } from '@prisma/client';

@Controller('brokers')
export class BrokersController extends BaseController<brokers> implements IController<brokers> {
    constructor(private readonly brokersService: BrokersService) {
        super(brokersService);
    }

    @Get()
    async findAll(@Req() req: Request): Promise<brokers[]> {
        return super.findAll(req);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<brokers> {
        return super.findOne(id);
    }

    @Post()
    async create(@Body() data: brokers): Promise<brokers> {
        return super.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: brokers): Promise<brokers> {
        return super.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return super.delete(id);
    }
}
