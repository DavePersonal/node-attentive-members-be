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
import { clients_to_brokers_external } from '@prisma/client';
import { ClientsToBrokersExternalService } from './clients_to_brokers_external.service';

@Controller('clients-to-brokers-external')
export class ClientsToBrokersExternalController
    extends BaseController<clients_to_brokers_external>
    implements IController<clients_to_brokers_external>
{
    constructor(private readonly clientsToBrokersExternalService: ClientsToBrokersExternalService) {
        super(clientsToBrokersExternalService);
    }

    @Get()
    async findAll(@Req() req: Request): Promise<clients_to_brokers_external[]> {
        return super.findAll(req);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<clients_to_brokers_external> {
        return super.findOne(id);
    }

    @Post()
    async create(@Body() data: clients_to_brokers_external): Promise<clients_to_brokers_external> {
        return super.create(data);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: clients_to_brokers_external,
    ): Promise<clients_to_brokers_external> {
        return super.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return super.delete(id);
    }
}
