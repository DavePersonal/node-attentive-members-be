import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {BaseService, PaginatedResult} from '../common/base.service'
import { IService } from '../common/interfaces/service.interface';
import { clients_to_brokers } from '@prisma/client'; // Import the Prisma model type
import * as jwt from 'jsonwebtoken';
import {ConfigService} from '@nestjs/config';
import {IQueryFilter} from '../shared/decorators/query-filter.decorator'

@Injectable()
export class ClientsToBrokersService
    extends BaseService<clients_to_brokers>
    implements IService<clients_to_brokers>
{
    constructor(prismaService: PrismaService, private configService: ConfigService) {
        super(prismaService, prismaService.clients_to_brokers);
    }

    async findAll(filter?: IQueryFilter, page?: number, size?: number): Promise<PaginatedResult<clients_to_brokers>> {
        return super.findAll(filter, page, size);
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
            throw new Error('Invalid or expired token');
        }
    }
}
