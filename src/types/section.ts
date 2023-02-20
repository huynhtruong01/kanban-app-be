import { Document } from 'mongoose'
import { IUser } from './user'

export interface ISection {
    id: string
    user: IUser
    title: string
}

export interface ISectionModel extends Document {
    user: string
    title: string
    _doc?: any
}
