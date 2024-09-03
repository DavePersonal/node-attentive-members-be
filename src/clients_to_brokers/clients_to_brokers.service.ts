import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from '../common/base.service';
import { IService } from '../common/interfaces/service.interface';
import { clients_to_brokers } from '@prisma/client'; // Import the Prisma model type

@Injectable()
export class ClientsToBrokersService
    extends BaseService<clients_to_brokers>
    implements IService<clients_to_brokers>
{
    constructor(prismaService: PrismaService) {
        super(prismaService, prismaService.clients_to_brokers);
    }

    async findAll(): Promise<clients_to_brokers[]> {
        return super.findAll();
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
}
