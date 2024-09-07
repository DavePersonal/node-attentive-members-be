import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Req,
    Param,
    Body,
} from '@nestjs/common';
import { Request } from 'express';
import { BaseController } from '../common/base.controller';
import { IController } from '../common/interfaces/controller.interface';
import { clients_to_brokers } from '@prisma/client';
import { ClientsToBrokersService } from './clients_to_brokers.service';

@Controller('clients-to-brokers')
export class ClientsToBrokersController
    extends BaseController<clients_to_brokers>
    implements IController<clients_to_brokers>
{
    constructor(private readonly clientsToBrokersService: ClientsToBrokersService) {
        super(clientsToBrokersService);
    }

    @Get()
    async findAll(@Req() req: Request): Promise<clients_to_brokers[]> {
        return super.findAll(req);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<clients_to_brokers> {
        return super.findOne(id);
    }

    @Post()
    async create(@Body() data: clients_to_brokers): Promise<clients_to_brokers> {
        return super.create(data);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: clients_to_brokers,
    ): Promise<clients_to_brokers> {
        return super.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return super.delete(id);
    }
}
