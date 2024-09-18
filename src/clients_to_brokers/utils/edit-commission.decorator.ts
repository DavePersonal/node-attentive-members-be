import {createParamDecorator, ExecutionContext} from '@nestjs/common'

export const EditCommissionDecorator = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        return {
            client_id: parseInt(request.body.client_id as string),
            broker_id: parseInt(request.body.broker_id as string),
            commission_rate_pepm: parseFloat(request.body.commission_rate_pepm as string),
            effective_date: new Date(request.body.effective_date as string),
            modified_by: request.body.modified_by as string,
            comment: request.body.comment,
        }
    },
)
