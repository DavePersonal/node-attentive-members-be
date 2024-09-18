import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Req,
    Param,
    Body, Query, ParseIntPipe,
} from '@nestjs/common'
import {Request} from 'express'
import {BaseController} from '../common/base.controller'
import {IController} from '../common/interfaces/controller.interface'
import {ClientsToBrokersService} from './clients_to_brokers.service'
import {clients_to_brokers} from '@prisma/client'
import {IQueryFilter, QueryFilter} from '../shared/decorators/query-filter.decorator'
import {QueryPage} from '../shared/decorators/query-page.decorator'
import {QuerySize} from '../shared/decorators/query-limit.decorator'
import {PaginatedResult} from '../common/base.service'
import {IQueryInclude, QueryInclude} from '../shared/decorators/query-include.decorator'
import {EditCommissionDecorator} from './utils/edit-commission.decorator'
import {IEditCommissionDto} from './clients_to_brokers.types'

@Controller('commission-rates')
export class ClientsToBrokersController extends BaseController<clients_to_brokers> implements IController<clients_to_brokers> {
    constructor(private readonly clientsToBrokersService: ClientsToBrokersService) {
        super(clientsToBrokersService)
    }

    @Get()
    async findAll(@QueryFilter() filter: IQueryFilter, @QueryInclude() include: IQueryInclude, @QueryPage() page: number, @QuerySize() size: number): Promise<PaginatedResult<clients_to_brokers>> {
        return super.findAll(filter, include, page, size)
    }

    @Get('history')
    async getHistory(@Query('broker_id', ParseIntPipe) broker_id: number,@Query('client_id', ParseIntPipe) client_id: number ): Promise<any> {
        return this.clientsToBrokersService.getHistory(broker_id, client_id)
    }

    @Get('validate-token')
    async validateToken(@Req() req: Request, @Query() token: {token: string}): Promise<any> {
       // TODO: validate token
        return null
    }

    @Get('resend-commission-email')
    async resendCommissionEmail(@Req() req: Request, @Query('token') token: {token: string}): Promise<any> {
        console.log('reosenent', token)
        return this.clientsToBrokersService.validateToken(token.token)
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<clients_to_brokers> {
        return super.findOne(id)
    }

    @Post()
    async create(@Body() data: clients_to_brokers): Promise<clients_to_brokers> {
        return super.create(data)
    }
    @Post('edit-commission')
    async editCommission(@EditCommissionDecorator() parsedBody: IEditCommissionDto): Promise<clients_to_brokers> {
        await this.clientsToBrokersService.editCommission(parsedBody)
        return null
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: clients_to_brokers,
    ): Promise<clients_to_brokers> {
        return super.update(id, data)
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<{success:boolean}> {
        return super.delete(id)
    }

}
