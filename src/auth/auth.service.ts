import { Injectable } from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {DatabaseDataAccess} from './database/database.dataAccess';
import {DatabaseCollection} from './database/database.collection';
import {HttpException} from '../common/exceptions/HttpException';
import {compare} from 'bcrypt'
import {MembersRolePermissionsDefault} from './database/members-roles.types';
import {AUTH_CONSTS} from './auth.consts';
import jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
    constructor() {
    }

    async login(loginDto: LoginDto) {
        const databaseDataAccess = await DatabaseDataAccess.getInstance()

        try {
            const user = await databaseDataAccess.filterOne(DatabaseCollection.Users, {email: loginDto.email})

            if (!user) {
                throw new HttpException(401, `Invalid credentials`)
            }

            const isPasswordValid = await compare(loginDto.password, user.password)

            if (!isPasswordValid) {
                throw new HttpException(401, `Invalid credentials`)
            }

            const account = await databaseDataAccess.filterOne(DatabaseCollection.Accounts, {_id: user.lastUsedAccount})

            if (!account) {
                throw new HttpException(401, `Account not found`)
            }

            if (!account?.isActive) {
                throw new HttpException(401, `Account is not active`)
            }

            const membersRoles = await databaseDataAccess.findAll(DatabaseCollection.MemberRoles, {_id: {$in: account.membersRoles || []}}) || []

            const permissions: Set<MembersRolePermissionsDefault> = new Set(membersRoles.map(role => role.permissions).flat())

            return {
                access_token: jwt.sign({account, user, permissions: [...permissions]}, AUTH_CONSTS.secret, {expiresIn: '4h'}),
            }
        } catch (e) {
            throw e
        }
    }
}
