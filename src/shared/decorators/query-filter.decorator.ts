import {createParamDecorator, ExecutionContext} from '@nestjs/common'

export interface IQueryFilter {
  [index: string]: any
}

export const QueryFilter = createParamDecorator((data: unknown, ctx: ExecutionContext): IQueryFilter => {
  const request = ctx.switchToHttp().getRequest()
  return request.query.filters ? JSON.parse(decodeURIComponent(request.query.filters)) : {}
})
