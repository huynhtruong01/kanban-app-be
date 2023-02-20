import { Request } from 'express'
import { Document } from 'mongoose'

export interface IUserModel extends Document {
    username: string
    fullname: string
    password: string | undefined
    confirmPassword: string | undefined
}

export interface IUser {
    id?: string
    _id?: string
    username: string
    fullname: string
    password: string | undefined
    confirmPassword: string | undefined
}

export interface IRequestUser extends Request {
    user?: IUser
}
