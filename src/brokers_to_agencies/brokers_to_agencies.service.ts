import { Injectable } from '@nestjs/common';
import {BaseService, PaginatedResult} from '../common/base.service'
import {brokers, brokers_to_agencies} from '@prisma/client';
import {IService} from '../common/interfaces/service.interface';
import {PrismaService} from '../prisma/prisma.service';
import {HttpException} from '../common/exceptions/HttpException';
import {IQueryFilter} from '../shared/decorators/query-filter.decorator'

@Injectable()
export class BrokersToAgenciesService extends BaseService<brokers_to_agencies> implements IService<brokers_to_agencies> {
    constructor(prismaService: PrismaService) {
        super(prismaService, prismaService.brokers_to_agencies);
    }

    async findHeadBrokerByBrokerId(brokerId: number): Promise<(brokers_to_agencies & { brokers: brokers })[] | HttpException> {
        const brokerToAgencyRelationShips = await this.prismaService.brokers_to_agencies.findFirst({
            where: {
                broker_id: brokerId
            },
        });

        if (!brokerToAgencyRelationShips) {
            return new HttpException(400, 'Broker does not have an agency'); // Throw an error if no agency is found for the broker
        }

        const agencyId = brokerToAgencyRelationShips.agency_id;

        const headBroker = await this.prismaService.brokers_to_agencies.findMany({
            where: {
                agency_id: agencyId,
                is_head_broker: true
            },
            include: {
                brokers: true
            }
        });

        if (!headBroker) {
            return new HttpException(400, 'Agency does not have a head broker'); // Throw an error if no head broker is found for the agency
        }

        return headBroker;
    }

    async findAll(filter?: IQueryFilter, page?: number, size?: number): Promise<PaginatedResult<brokers_to_agencies>> {
        return super.findAll(filter, page, size);
    }

    async findOne(id: number): Promise<brokers_to_agencies | null> {
        return super.findOne(id);
    }

    async create(data: brokers_to_agencies): Promise<brokers_to_agencies> {
        return super.create(data);
    }

    async update(id: number, data: brokers_to_agencies): Promise<brokers_to_agencies> {
        return super.update(id, data);
    }

    async delete(id: number): Promise<brokers_to_agencies> {
        return super.delete(id);
    }
}

