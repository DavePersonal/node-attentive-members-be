import {createParamDecorator, ExecutionContext, Injectable} from '@nestjs/common'
import {BrokersService} from '../../brokers/brokers.service'
import {PrismaService} from '../../prisma/prisma.service'

@Injectable()
export class BrokerIdDecorator {
    prismaService: PrismaService
    brokerService: BrokersService

    constructor() {
        this.prismaService = new PrismaService()
        this.brokerService = new BrokersService(this.prismaService)
    }

    async getBrokerId(ctx: ExecutionContext): Promise<number|undefined> {
        const request = ctx.switchToHttp().getRequest()
        const broker = await this.brokerService.findFirst({email: request.user.account.email})
        return broker ? broker.id : undefined
    }
}

export const BrokerId = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext): Promise<number|undefined> => {
        const brokerIdDecorator = new BrokerIdDecorator()
        return brokerIdDecorator.getBrokerId(ctx)
    },
)
