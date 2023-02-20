import mongoose from 'mongoose'
import { schemaOptions } from '../config'
import { IBoardModel } from '../types'

const boardSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        icon: {
            type: String,
            default: '📜',
        },
        title: {
            type: String,
            default: 'Untitled',
        },
        description: {
            type: String,
            default: `Add description here 
      🟢 You can add multiline description
      🟢 Let't start...
      `,
        },
        position: {
            type: Number,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        favoritePosition: {
            type: Number,
            default: 0,
        },
    },
    schemaOptions
)

export const Board = mongoose.model<IBoardModel>('Board', boardSchema)
