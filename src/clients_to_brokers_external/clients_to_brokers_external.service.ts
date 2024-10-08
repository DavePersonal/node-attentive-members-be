// src/clients-to-brokers-external/clients-to-brokers-external.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from '../common/base.service';
import { IService } from '../common/interfaces/service.interface';
import { clients_to_brokers_external } from '@prisma/client'; // Import the Prisma model type

@Injectable()
export class ClientsToBrokersExternalService
    extends BaseService<clients_to_brokers_external>
    implements IService<clients_to_brokers_external>
{
    constructor(prismaService: PrismaService) {
        super(prismaService, prismaService.clients_to_brokers_external);
    }

    async findAll(): Promise<clients_to_brokers_external[]> {
        return super.findAll();
    }

    async findOne(id: number): Promise<clients_to_brokers_external | null> {
        return super.findOne(id);
    }

    async create(data: clients_to_brokers_external): Promise<clients_to_brokers_external> {
        return super.create(data);
    }

    async update(
        id: number,
        data: clients_to_brokers_external,
    ): Promise<clients_to_brokers_external> {
        return super.update(id, data);
    }

    async delete(id: number): Promise<clients_to_brokers_external> {
        return super.delete(id);
    }
}
