import express from 'express'
import boardRoutes from './boardRoutes'
import sectionRoutes from './sectionRoutes'
import taskRoutes from './taskRoutes'

const router = express.Router()

export const routes = [
    router.use('/boards', boardRoutes),
    router.use('/sections', sectionRoutes),
    router.use('/tasks', taskRoutes),
]
