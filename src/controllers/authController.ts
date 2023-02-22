import { NextFunction, Request, Response } from 'express'
import { User } from '../models'
import { checkPassword, signToken } from '../utils'

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.create(req.body)
        const token = signToken(user.id)

        res.status(201).json({
            status: 'success',
            data: {
                user,
                token,
            },
        })
    } catch (error: any) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        })
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Invalid username or not found this user.',
            })
        }

        if (user.password) {
            const isCorrectPassword = await checkPassword(password, user.password)
            if (!isCorrectPassword) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Incorrect password.',
                })
            }

            user.password = undefined
            user.confirmPassword = undefined
            console.log(user)

            const token = signToken(user.id)
            console.log(token)

            res.status(200).json({
                status: 'success',
                data: {
                    user,
                    token,
                },
            })
        }
    } catch (error: any) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        })
    }
}
