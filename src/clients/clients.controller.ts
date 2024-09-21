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
    UseGuards,
} from '@nestjs/common'
import {ClientsService} from './clients.service'
import {BaseController} from '../common/base.controller'
import {IController} from '../common/interfaces/controller.interface'
import {clients} from '@prisma/client'
import {EmailService} from '../common/email/email.service'
import {EmailActions} from '../common/email/email-actions.enum'
import {IQueryFilter, QueryFilter} from '../shared/decorators/query-filter.decorator'
import {QueryPage} from '../shared/decorators/query-page.decorator'
import {QuerySize} from '../shared/decorators/query-limit.decorator'
import {PaginatedResult} from '../common/base.service'
import {IQueryInclude, QueryInclude} from '../shared/decorators/query-include.decorator'
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard'
import {BrokerId} from '../shared/decorators/broker.decorator'
import {BrokersToAgenciesService} from '../brokers_to_agencies/brokers_to_agencies.service'
import {ClientsToBrokersService} from '../clients_to_brokers/clients_to_brokers.service'
import {RequestInfoDto} from './dto/request-info.dto'

@Controller('clients')
export class ClientsController extends BaseController<clients> implements IController<clients> {

    constructor(
        private readonly clientsService: ClientsService,
        private readonly emailService: EmailService, // Inject the EmailService
        private readonly brokerToAgencyService: BrokersToAgenciesService,
        private readonly clientsToBrokersService: ClientsToBrokersService,
    ) {
        super(clientsService)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAllForLoggedBroker(@QueryFilter() filter: IQueryFilter, @QueryInclude() include: IQueryInclude, @QueryPage() page: number, @QuerySize() size: number, @BrokerId() broker_id: number): Promise<PaginatedResult<clients>> {
        // TODO: fix this, dont know which table to which
        if (broker_id) {
            filter = {
                ...filter,
                // brokers: {
                //     some: {
                //         id: broker_id,
                //     },
                // },
            }
        }
        return super.findAll(filter, include, page, size)
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<clients> {
        return super.findOne(id)
    }


    @Post(':id/request-info')
    async requestInfo(@Param('id', ParseIntPipe) id: number, @Body() body: RequestInfoDto): Promise<{emailSent: boolean}> {
        const broker = await this.clientsToBrokersService.findFirst({client_id: id})
        const headBroker = await this.brokerToAgencyService.findHeadBrokerByBrokerId(broker.id)

        // await this.sendgridEmailService.sendClientEmail(req.body, client.client_name, clientId, client.brokerId);

        return {emailSent: true}
    }

    @Post()
    async create(
        @Body() clientToCreate: clients,
        @Query('sendEmail') sendEmail?: string, // Extract the query parameter
    ): Promise<clients> {
        try {
            // Call the service's create method
            const createdClient = await this.clientsService.create(clientToCreate)

            // Send an email if the creation was successful
            if (sendEmail === 'true') {
                await this.emailService.sendEmail(EmailActions.NewClient, {
                    firstName: 'Bob',
                    clientName: createdClient.client_name,
                    // todo: update the URL to the correct one when i know more
                    commissionFormUrl: `${process.env.PROTOCOL}://${process.env.DOMAIN}/broker?token=${this.emailService.createJwtToken({
                        client_id: createdClient.id,
                        broker_id: 1,
                        recipientEmail: 'david@oakmorelabs.com',
                    })}`,
                })
            }

            // Returning the created client automatically sends a 201 Created response
            return createdClient
        } catch (error) {
            throw new HttpException(
                'Error during client creation or email sending.',
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: clients,
    ): Promise<clients> {
        return super.update(id, data)
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<{success:boolean}> {
        return super.delete(id)
    }
}
