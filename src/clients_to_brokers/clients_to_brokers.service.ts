import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service';
import {BaseService, PaginatedResult} from '../common/base.service'
import { IService } from '../common/interfaces/service.interface';
import { clients_to_brokers } from '@prisma/client'; // Import the Prisma model type
import * as jwt from 'jsonwebtoken';
import {ConfigService} from '@nestjs/config';
import {IQueryFilter} from '../shared/decorators/query-filter.decorator'
import {ClientsService} from '../clients/clients.service'
import {IQueryInclude} from '../shared/decorators/query-include.decorator'

@Injectable()
export class ClientsToBrokersService
    extends BaseService<clients_to_brokers>
    implements IService<clients_to_brokers>
{
    constructor(prismaService: PrismaService, private configService: ConfigService,private clientService: ClientsService) {
        super(prismaService, prismaService.clients_to_brokers);
    }

    async findAll(filter?: IQueryFilter,include?: IQueryInclude, page?: number, size?: number): Promise<PaginatedResult<clients_to_brokers>> {
        return super.findAll(filter, include, page, size);
    }

    async findOne(id: number): Promise<clients_to_brokers | null> {
        return super.findOne(id);
    }

    async create(data: clients_to_brokers): Promise<clients_to_brokers> {
        return super.create(data);
    }

    async update(
        id: number,
        data: clients_to_brokers,
    ): Promise<clients_to_brokers> {
        return super.update(id, data);
    }

    async delete(id: number): Promise<clients_to_brokers> {
        return super.delete(id);
    }

    validateToken(token: string): any {
        try {
            const secret = this.configService.get<string>('JWT_SECRET');
            return jwt.verify(token, secret);
        } catch (error) {
            throw new HttpException('Invalid or expired token', HttpStatus.UNAUTHORIZED);
        }
    }

    async getHistory(broker_id: number, client_id: number) {
        // TODO: fix brokers doesnt exists on client
        // Find the client and load the related brokers and clients_to_brokers
        const {records: clients} = await this.clientService.findAll({id: client_id},{clients_to_brokers: true},  0, 1);
        // const clients = await clientRepository.find({
        //     where: {id: clientId},
        //     relations: ['brokers', 'clients_to_brokers'],
        // });
        console.log(clients, 'clients')

        if (!clients?.length) {
            throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
        }

        console.log((clients as any)[0]?.clients_to_brokers)
        const data = clients.map((client: any) => {
            return client.clients_to_brokers.map(j => {
                const broker = client.brokers.find(b => b.id === j.broker_id);
                if (broker) {
                    return {
                        client_name: client.client_name,
                        client_id: client.id,
                        broker_name: broker.broker_name,
                        broker_id: broker.id,
                        effective_date: j.effective_date,
                        commission_rate_pepm: j.commission_rate_pepm,
                        modified_by: j.modified_by,
                        modified_date: j.modified_date,
                        comment: j.comment
                    }
                }
            })
        })
        console.log(data, 'data')

        // clients.forEach(client => {
        //     client.clients_to_brokers.forEach(ctb => {
        //         const broker = client.brokers.find(b => b.id === ctb.broker_id);
        //         if (broker) {
        //             result.push({
        //                 clientName: client.client_name,
        //                 clientId: client.id,
        //                 brokerName: broker.broker_name,
        //                 brokerId: broker.id,
        //                 effectiveDate: ctb.effective_date,
        //                 commission_pepm: ctb.commission_rate_pepm,
        //                 modified_by: ctb.modified_by,
        //                 modified_date: ctb.modified_date,
        //                 comment: ctb.comment
        //             });
        //         }
        //     });
        // });

        return data
    }
}
