import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common'
import {Response} from 'express'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const status = exception instanceof HttpException ? exception.getStatus() : exception.status || HttpStatus.INTERNAL_SERVER_ERROR
    const message = exception instanceof HttpException ? exception.getResponse() : exception?.message || 'Internal server error'

    response
      .status(status)
      .json({
        status: status,
        timestamp: new Date().toISOString(),
        message: typeof message === 'string' ? message : (message as any).message,
      })
  }
}
