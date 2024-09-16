import {createParamDecorator, ExecutionContext} from '@nestjs/common'


export const QuerySize = createParamDecorator((data: unknown, ctx: ExecutionContext): number => {
  const request = ctx.switchToHttp().getRequest()
  return parseInt(request.query.size as any) || 10
})
