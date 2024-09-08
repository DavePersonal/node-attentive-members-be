import {ObjectId} from 'mongodb'

export interface IUser {
    _id?: ObjectId
    email: string
    password: string
    firstname: string
    surname: string
    lastUsedAccount: ObjectId
    isSuperAdmin: boolean
}

export interface IAccount {
    _id?: ObjectId
    email: string
    firstname: string
    surname: string
    isDefault: boolean
    user: ObjectId
    role: ObjectId
    additionalRoles?: ObjectId[]
    membersRoles?: ObjectId[]
    isActive?: boolean
}
