import {Injectable} from '@nestjs/common'
import {IAccount, IUser} from '../auth.types'

@Injectable()
export class JwtDto {
  user: IUser
  account: IAccount
  permissions: string[]
}
