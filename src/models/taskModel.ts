import mongoose from 'mongoose'
import { schemaOptions } from '../config'
import { ITaskModel } from '../types'

const taskSchema = new mongoose.Schema(
    {
        section: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Section',
            required: true,
        },
        title: {
            type: String,
            default: '',
        },
        content: {
            type: String,
            default: '',
        },
        position: {
            type: Number,
        },
    },
    schemaOptions
)

taskSchema.pre('save', function (next) {
    this.populate('Section')
    next()
})

export const Task = mongoose.model<ITaskModel>('Task', taskSchema)
