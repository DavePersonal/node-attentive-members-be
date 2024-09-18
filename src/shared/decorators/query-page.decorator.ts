import {createParamDecorator, ExecutionContext} from '@nestjs/common'

export const QueryPage = createParamDecorator((data: unknown, ctx: ExecutionContext): number => {
  const request = ctx.switchToHttp().getRequest()
  return parseInt(request.query.page as any) || 0
})
