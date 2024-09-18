import {createParamDecorator, ExecutionContext} from '@nestjs/common'

export interface IQueryInclude {
  [index: string]: any
}

export const QueryInclude = createParamDecorator((data: unknown, ctx: ExecutionContext): IQueryInclude => {
  const request = ctx.switchToHttp().getRequest()
  return request.query.include ? JSON.parse(decodeURIComponent(request.query.include)) : {}
})
