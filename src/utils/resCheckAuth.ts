import { Response } from 'express'

export const resCheckAuth = (res: Response) => {
    return res.status(401).json({
        status: 'error',
        message: 'Invalid Authenticated.',
    })
}
