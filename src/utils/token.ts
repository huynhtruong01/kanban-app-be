import jwt, { JwtPayload } from 'jsonwebtoken'
import { IJwtPayload } from '../middlewares'

export const signToken = (id: string) => {
    jwt.sign({ id }, process.env.TOKEN_SECRET_KEY as string, {
        expiresIn: process.env.EXPIRE_IN,
    })
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.TOKEN_SECRET_KEY as string) as IJwtPayload
}
