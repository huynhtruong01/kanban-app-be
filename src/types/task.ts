import { Document } from 'mongoose'

export interface ITaskModel extends Document {
    section: string
    title: string
    content: string
    position: number
}
