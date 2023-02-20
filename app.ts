import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { connectDB } from './src/config'
import { routes } from './src/routes'
const app = express()

dotenv.config({
    path: './.env',
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors())

app.use('/api/v1', routes)

connectDB()

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is running, port: ${port}`))
