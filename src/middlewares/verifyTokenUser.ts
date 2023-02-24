import { NextFunction, Response } from 'express'
import { User } from '../models'
import { IRequestUser } from '../types'
import { verifyToken } from '../utils'

export interface IJwtPayload {
    id: string
}

export const decodeToken = (req: IRequestUser) => {
    const bearerHeader = req.headers['authorization']

    if (bearerHeader) {
        const token: string = bearerHeader.split(' ')[1]
        const user: IJwtPayload = verifyToken(token)
        if (user) return user
    }

    return
}

export const verifyTokenUser = async (
    req: IRequestUser,
    res: Response,
    next: NextFunction
) => {
    try {
        const decodedToken: IJwtPayload | undefined = decodeToken(req)

        if (!decodedToken)
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized.',
            })

        const user = await User.findById(decodedToken.id)
        if (!user)
            return res.status(404).json({
                status: 'error',
                message: 'Not found this user.',
            })

        req.user = user
        next()
    } catch (error: any) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        })
    }
}
