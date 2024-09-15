import {Body, Controller, Delete, Get, Param, Post, Put, Req} from '@nestjs/common';
import {BaseController} from '../common/base.controller';
import {brokers, brokers_to_agencies} from '@prisma/client';
import {IController} from '../common/interfaces/controller.interface';
import {Request} from 'express';
import {BrokersToAgenciesService} from './brokers_to_agencies.service';

@Controller('brokers-to-agencies')
export class BrokersToAgenciesController extends BaseController<brokers_to_agencies> implements IController<brokers_to_agencies> {
    constructor(private readonly brokersToAgenciesService: BrokersToAgenciesService) {
        super(brokersToAgenciesService);
    }

    @Get()
    async findAll(@Req() req: Request): Promise<brokers_to_agencies[]> {
        return super.findAll(req);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<brokers_to_agencies> {
        return super.findOne(id);
    }

    @Post()
    async create(@Body() data: brokers_to_agencies): Promise<brokers_to_agencies> {
        return super.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: brokers_to_agencies): Promise<brokers_to_agencies> {
        return super.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return super.delete(id);
    }
}