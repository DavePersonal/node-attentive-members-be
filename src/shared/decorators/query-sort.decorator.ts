import {createParamDecorator, ExecutionContext} from '@nestjs/common'

export interface IQuerySort {
  [index: string]: any
}

export const QuerySort = createParamDecorator((data: unknown, ctx: ExecutionContext): IQuerySort => {
  const request = ctx.switchToHttp().getRequest()
  if (request.query?.sort) {
    try {
      return JSON.parse(decodeURIComponent(request.query.sort))
    } catch (e) {
      // pass because filter not present in query
    }
  }
})
