import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Req,
    Param,
    Body,
    Query,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { ClientsService } from './clients.service';
import { BaseController } from '../common/base.controller';
import { IController } from '../common/interfaces/controller.interface';
import { clients } from '@prisma/client';
import { EmailService } from '../common/email/email.service';

@Controller('clients')
export class ClientsController
    extends BaseController<clients>
    implements IController<clients>
{
    constructor(
        private readonly clientsService: ClientsService,
        private readonly emailService: EmailService, // Inject the EmailService
    ) {
        super(clientsService);
    }

    @Get()
    async findAll(@Req() req: Request): Promise<clients[]> {
        return super.findAll(req);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<clients> {
        return super.findOne(id);
    }

    @Post()
    async create(
        @Body() data: clients,
        @Query('sendEmail') sendEmail?: string, // Extract the query parameter
    ): Promise<clients> {
        try {
            // Call the service's create method
            const createdClient = await this.clientsService.create(data);

            // Send an email if the creation was successful
            if (sendEmail === 'true') {
                await this.emailService.sendClientEmail(
                    {
                        first_name: 'Nicolas',
                        last_name: 'Cano',
                        email: 'david@oakmorelabs.com',
                    },
                    data.client_name,
                    data.id,
                );
            }

            // Returning the created client automatically sends a 201 Created response
            return createdClient;
        } catch (error) {
            throw new HttpException(
                'Error during client creation or email sending.',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: clients,
    ): Promise<clients> {
        return super.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return super.delete(id);
    }
}
