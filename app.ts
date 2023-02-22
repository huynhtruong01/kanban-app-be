import cors from 'cors'
import dotenv from 'dotenv'
import express, { Response } from 'express'
import morgan from 'morgan'
import { connectDB } from './src/config'
import { routes } from './src/routes'
import { IRequestUser } from './src/types'
const app = express()

dotenv.config({
    path: './.env',
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors())

app.use(
    '/api/v1',

    routes
)

app.use('/api/v1', (req: IRequestUser, res: Response) => {
    res.json({
        title: 'Welcome to Kanban API.',
    })
})

connectDB()

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is running, port: ${port}`))
