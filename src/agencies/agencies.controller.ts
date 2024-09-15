import {Body, Controller, Delete, Get, Param, Post, Put, Req} from '@nestjs/common';
import {BaseController} from '../common/base.controller';
import {agencies, brokers} from '@prisma/client';
import {IController} from '../common/interfaces/controller.interface';
import {AgenciesService} from './agencies.service';
import {Request} from 'express';

@Controller('agencies')
export class AgenciesController extends BaseController<agencies> implements IController<agencies> {
    constructor(private readonly agenciesService: AgenciesService) {
        super(agenciesService);
    }

    @Get()
    async findAll(@Req() req: Request): Promise<agencies[]> {
        return super.findAll(req);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<agencies> {
        return super.findOne(id);
    }

    @Post()
    async create(@Body() data: agencies): Promise<agencies> {
        return super.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: agencies): Promise<agencies> {
        return super.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return super.delete(id);
    }

}
