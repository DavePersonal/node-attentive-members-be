import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req} from '@nestjs/common';
import {BaseController} from '../common/base.controller';
import {agencies, brokers} from '@prisma/client';
import {IController} from '../common/interfaces/controller.interface';
import {AgenciesService} from './agencies.service';
import {Request} from 'express';
import {BrokersToAgenciesService} from '../brokers_to_agencies/brokers_to_agencies.service';
import {HttpException} from '../common/exceptions/HttpException';

@Controller('agencies')
export class AgenciesController extends BaseController<agencies> implements IController<agencies> {
    constructor(private readonly agenciesService: AgenciesService, private readonly brokersToAgeniesService: BrokersToAgenciesService) {
        super(agenciesService);
    }

    @Get('/getAgencyByBrokerId')
    async getAgencyByBrokerId(@Req() req: Request, @Query() brokerId: number): Promise<agencies[]> {
        if (!brokerId) {
            throw new HttpException(400, 'Broker ID is required');
        }
        const brokerToAgencies = await this.agenciesService.findAgencyByBrokerId(brokerId);
        return brokerToAgencies
    }

    @Get('/agencyHeadByBrokerId')
    async getAgencyHeadByBrokerId(@Req() req: Request, @Query() brokerId: number): Promise<brokers> {
        if (!brokerId) {
            throw new HttpException(400, 'Broker ID is required');
        }
        const brokerToAgencies = await this.brokersToAgeniesService.findHeadBrokerByBrokerId(brokerId);
        return brokerToAgencies[0].brokers
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
