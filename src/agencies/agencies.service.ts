import { Injectable } from '@nestjs/common';
import {BaseService} from '../common/base.service';
import {agencies} from '@prisma/client';
import {IService} from '../common/interfaces/service.interface';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class AgenciesService extends BaseService<agencies> implements IService<agencies> {
    constructor(prismaService: PrismaService) {
        super(prismaService, prismaService.agencies);
    }

    async findAgencyByBrokerId(brokerId: number) {
        const agencies = await this.prismaService.agencies.findMany({
            where: {
                brokers_to_agencies: {
                    some: {
                        broker_id: brokerId, // Correct nested filtering by using `some` to filter on a related field
                    },
                },
            },
            include: {
                brokers_to_agencies: true, // Include related `brokers_to_agencies` data
            },
        });

        return agencies;
    }

    async findAll(): Promise<agencies[]> {
        return super.findAll();
    }

    async findOne(id: number): Promise<agencies | null> {
        return super.findOne(id);
    }

    async create(data: agencies): Promise<agencies> {
        return super.create(data);
    }

    async update(id: number, data: agencies): Promise<agencies> {
        return super.update(id, data);
    }

    async delete(id: number): Promise<agencies> {
        return super.delete(id);
    }
}
