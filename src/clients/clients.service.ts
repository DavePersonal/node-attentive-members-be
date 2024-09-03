import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from '../common/base.service';
import { IService } from '../common/interfaces/service.interface';
import { clients } from '@prisma/client'; // Import the Prisma model type

@Injectable()
export class ClientsService extends BaseService<clients> implements IService<clients> {
    constructor(prismaService: PrismaService) {
        super(prismaService, prismaService.clients);
    }

    async findAll(): Promise<clients[]> {
        return super.findAll();
    }

    async findOne(id: number): Promise<clients | null> {
        return super.findOne(id);
    }

    async create(data: clients): Promise<clients> {
        return super.create(data);
    }

    async update(id: number, data: clients): Promise<clients> {
        return super.update(id, data);
    }

    async delete(id: number): Promise<clients> {
        return super.delete(id);
    }
}
