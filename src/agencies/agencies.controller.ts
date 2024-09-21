import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Req,
} from '@nestjs/common'
import {BaseController} from '../common/base.controller'
import {agencies, brokers} from '@prisma/client'
import {IController} from '../common/interfaces/controller.interface'
import {AgenciesService} from './agencies.service'
import {Request} from 'express'
import {BrokersToAgenciesService} from '../brokers_to_agencies/brokers_to_agencies.service'
import {IQueryFilter, QueryFilter} from '../shared/decorators/query-filter.decorator'
import {QueryPage} from '../shared/decorators/query-page.decorator'
import {QuerySize} from '../shared/decorators/query-limit.decorator'
import {PaginatedResult} from '../common/base.service'
import {IQueryInclude, QueryInclude} from '../shared/decorators/query-include.decorator'

@Controller('agencies')
export class AgenciesController extends BaseController<agencies> implements IController<agencies> {
    constructor(private readonly agenciesService: AgenciesService, private readonly brokersToAgenciesService: BrokersToAgenciesService) {
        super(agenciesService);
    }

    @Get()
    async findAll(@QueryFilter() filter: IQueryFilter, @QueryInclude() include: IQueryInclude, @QueryPage() page: number, @QuerySize() size: number): Promise<PaginatedResult<agencies>> {
        return super.findAll(filter, include, page, size);
    }

    @Get('/agency-by-broker-id')
    async getAgencyByBrokerId(@Req() req: Request, @Query('broker_id', ParseIntPipe) broker_id: number): Promise<agencies[]> {
        if (!broker_id) {
            throw new HttpException('Broker ID is required', HttpStatus.BAD_REQUEST);
        }
        return await this.agenciesService.findAgencyByBrokerId(broker_id)
    }

    @Get('/agency-heard-by-broker-id')
    async getAgencyHeadByBrokerId(@Req() req: Request, @Query('broker_id', ParseIntPipe) broker_id: number): Promise<brokers> {
        if (!broker_id) {
            throw new HttpException('Broker ID is required', HttpStatus.BAD_REQUEST);
        }
        const brokerToAgencies = await this.brokersToAgenciesService.findHeadBrokerByBrokerId(broker_id);
        return brokerToAgencies[0]?.brokers || null
    }


    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<agencies> {
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
    async delete(@Param('id') id: number): Promise<{success:boolean}> {
        return super.delete(id);
    }

}
