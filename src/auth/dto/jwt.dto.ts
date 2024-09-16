import {Injectable} from '@nestjs/common'

@Injectable()
export class JwtDto {
  user: any
  account: any
  permissions: string[]
}
