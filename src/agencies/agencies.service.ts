import { Injectable } from '@nestjs/common';
import {BaseService, PaginatedResult} from '../common/base.service'
import {agencies} from '@prisma/client';
import {IService} from '../common/interfaces/service.interface';
import {PrismaService} from '../prisma/prisma.service';
import {IQueryFilter} from '../shared/decorators/query-filter.decorator'

@Injectable()
export class AgenciesService extends BaseService<agencies> implements IService<agencies> {
    constructor(prismaService: PrismaService) {
        super(prismaService, prismaService.agencies);
    }

    async findAgencyByBrokerId(broker_id: number) {
        const agencies = await this.prismaService.agencies.findMany({
            where: {
                brokers_to_agencies: {
                    some: {
                        broker_id: broker_id, // Correct nested filtering by using `some` to filter on a related field
                    },
                },
            },
            include: {
                brokers_to_agencies: true, // Include related `brokers_to_agencies` data
            },
        });

        return agencies;
    }

    async findAll(filter?: IQueryFilter, include?: any, page?: number, size?: number): Promise<PaginatedResult<agencies>> {
        return super.findAll(filter, include, page, size);
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
