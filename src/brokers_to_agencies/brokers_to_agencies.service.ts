import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {BaseService, PaginatedResult} from '../common/base.service'
import {brokers, brokers_to_agencies} from '@prisma/client'
import {IService} from '../common/interfaces/service.interface'
import {PrismaService} from '../prisma/prisma.service'
import {IQueryFilter} from '../shared/decorators/query-filter.decorator'
import {IQueryInclude} from '../shared/decorators/query-include.decorator'
import {EmailActions} from '../common/email/email-actions.enum'
import {EmailService} from '../common/email/email.service'
import {EmailData} from '../common/email/email-data.types'

@Injectable()
export class BrokersToAgenciesService extends BaseService<brokers_to_agencies> implements IService<brokers_to_agencies> {
    constructor(
        prismaService: PrismaService,
        private emailService: EmailService,
    ) {
        super(prismaService, prismaService.brokers_to_agencies)
    }

    async findHeadBrokerByBrokerId(broker_id: number): Promise<(brokers_to_agencies)|HttpException> {
        const brokerToAgencyRelationShips = await this.findFirst({broker_id})

        if (!brokerToAgencyRelationShips) {
            return new HttpException('Broker does not have an agency', HttpStatus.BAD_REQUEST) // Throw an error if no agency is found for the broker
        }

        const agency_id = brokerToAgencyRelationShips.agency_id

        const headBroker = await super.findFirst({agency_id: agency_id, is_head_broker: true}, {brokers: true})

        if (!headBroker) {
            // TODO: Dejv send email to support
            // const emailData = {
            //     email_subject: 'Attentive Member Manager - Agency without Head broker',
            //     email_data: `No agency head found for agency of Broker with Id ${broker_id}.`,
            // } as EmailData[EmailActions.Support];

            // await this.emailService.sendEmail(EmailActions.Support, emailData)
            return new HttpException('Agency does not have a head broker', HttpStatus.BAD_REQUEST) // Throw an error if no head broker is found for the agency
        }

        return headBroker
    }

    async findAll(filter?: IQueryFilter, include?: IQueryInclude, page?: number, size?: number): Promise<PaginatedResult<brokers_to_agencies>> {
        return super.findAll(filter, include, page, size)
    }

    async findOne(id: number): Promise<brokers_to_agencies|null> {
        return super.findOne(id)
    }

    async create(data: brokers_to_agencies): Promise<brokers_to_agencies> {
        return super.create(data)
    }

    async update(id: number, data: brokers_to_agencies): Promise<brokers_to_agencies> {
        return super.update(id, data)
    }

    async delete(id: number): Promise<brokers_to_agencies> {
        return super.delete(id)
    }
}

