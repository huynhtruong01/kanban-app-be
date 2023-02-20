import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { IUserModel } from '../types'
import { schemaOptions } from './../config/schemaOptions'

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: [true, 'User must have a username.'],
            unique: true,
            trim: true,
        },
        fullname: {
            type: String,
            require: [true, 'User must have fullname.'],
            trim: true,
        },
        password: {
            type: String,
            minLength: [6, 'Password must have at least six characters.'],
        },
        confirmPassword: {
            type: String,
            minLength: [6, 'Password must have at least six characters.'],
        },
    },
    schemaOptions
)

userSchema.pre('save', async function (next) {
    if (this.isModified('password') && this.password) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

export const User = mongoose.model<IUserModel>('User', userSchema)
