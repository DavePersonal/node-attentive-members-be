// src/clients-to-brokers/clients-to-brokers.controller.ts

import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Req,
    Res,
    Param,
    Body,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { IController } from '../common/interfaces/controller.interface';
import { clients_to_brokers } from '@prisma/client';
import {ClientsToBrokersService} from './clients_to_brokers.service';

@Controller('clients-to-brokers')
export class ClientsToBrokersController
    extends BaseController<clients_to_brokers>
    implements IController<clients_to_brokers>
{
    constructor(private readonly clientsToBrokersService: ClientsToBrokersService) {
        super(clientsToBrokersService);
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
    async create(
        @Body() data: clients_to_brokers,
        @Res() res: Response,
    ): Promise<void> {
        return super.create(data, res);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: clients_to_brokers,
        @Res() res: Response,
    ): Promise<void> {
        return super.update(id, data, res);
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response): Promise<void> {
        return super.delete(id, res);
    }
}
