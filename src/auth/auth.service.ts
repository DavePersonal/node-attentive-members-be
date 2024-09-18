import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import {LoginDto} from './dto/login.dto'
import {DatabaseDataAccess} from './database/database.dataAccess'
import {DatabaseCollection} from './database/database.collection'
import {compare} from 'bcrypt'
import {MembersRolePermissionsDefault} from './database/members-roles.types'
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async login(loginDto: LoginDto) {
    const databaseDataAccess = await DatabaseDataAccess.getInstance()

    const user = await databaseDataAccess.filterOne(DatabaseCollection.Users, {email: loginDto.email})

    if (!user) {
      throw new HttpException(`Invalid credentials`, HttpStatus.UNAUTHORIZED)
    }

    const isPasswordValid = await compare(loginDto.password, user.password)

    if (!isPasswordValid) {
      throw new HttpException(`Invalid credentials`, HttpStatus.UNAUTHORIZED)
    }

    const account = await databaseDataAccess.filterOne(DatabaseCollection.Accounts, {_id: user.lastUsedAccount})

    if (!account) {
      throw new HttpException(`Account not found`, HttpStatus.UNAUTHORIZED)
    }

    if (!account?.isActive) {
      throw new HttpException(`Account is not active`, HttpStatus.UNAUTHORIZED)
    }

    const membersRoles = await databaseDataAccess.findAll(DatabaseCollection.MemberRoles, {_id: {$in: account.membersRoles || []}}) || []

    const permissions: Set<MembersRolePermissionsDefault> = new Set(membersRoles.map(role => role.permissions).flat())

    return {
      access_token: this.jwt.sign({account, user, permissions: [...permissions]}),
    }
  }
}
