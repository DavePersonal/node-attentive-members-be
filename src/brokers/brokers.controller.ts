import { Controller, Get, Post, Put, Delete, Req, Res, Param, Body } from '@nestjs/common';
import { Request, Response } from 'express';
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
    async findAll(@Req() req: Request, @Res() res: Response): Promise<void> {
        return super.findAll(req, res);
    }

    @Get(':id')
    async findOne(@Param('id') id: number, @Res() res: Response): Promise<void> {
        return super.findOne(id, res);
    }

    @Post()
    async create(@Body() data: brokers, @Res() res: Response): Promise<void> {
        return super.create(data, res);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: brokers, @Res() res: Response): Promise<void> {
        return super.update(id, data, res);
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response): Promise<void> {
        return super.delete(id, res);
    }
}
