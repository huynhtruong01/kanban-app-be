import { Document, ObjectId } from 'mongoose'
import { IUser } from './user'

export interface IBoard {
    id: string
    user: IUser
    icon: string
    title: string
    description: string
    position: number
    favorite: boolean
    favoritePosition: number
}

export interface IBoardModel extends Document {
    _doc?: any
    user: string
    icon: string
    title: string
    description: string
    position: number
    favorite: boolean
    favoritePosition: number
}
