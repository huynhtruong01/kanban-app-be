import mongoose from 'mongoose'
import { schemaOptions } from '../config'
import { ISectionModel } from '../types'

const sectionModel = new mongoose.Schema(
    {
        board: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board',
            require: true,
        },
        title: {
            type: String,
            default: '',
        },
    },
    schemaOptions
)

export const Section = mongoose.model<ISectionModel>('Section', sectionModel)
