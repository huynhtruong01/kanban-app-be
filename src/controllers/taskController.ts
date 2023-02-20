import { NextFunction, Response } from 'express'
import { Section, Task } from '../models'
import { IRequestUser } from '../types'

export const create = async (req: IRequestUser, res: Response, next: NextFunction) => {
    const { sectionId } = req.body

    try {
        const section = await Section.findById(sectionId)
        if (section) {
            const tasksCount = await Task.find({ section: section.id }).count()

            const newTask = await Task.create({
                section: section.id,
                position: tasksCount > 0 ? tasksCount : 0,
            })

            res.status(201).json({
                status: 'success',
                task: newTask,
            })
        }
    } catch (error: any) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        })
    }
}

export const update = async (req: IRequestUser, res: Response, next: NextFunction) => {
    const { taskId } = req.params

    try {
        const task = await Task.findById(taskId)
        if (!task)
            return res.status(404).json({
                status: 'error',
                message: 'Not found this task.',
            })

        const newTask = await Task.findByIdAndUpdate(
            taskId,
            {
                $set: req.body,
            },
            {
                new: true,
                runValidators: true,
            }
        )

        res.status(200).json({
            status: 'success',
            data: {
                task: newTask,
            },
        })
    } catch (error: any) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        })
    }
}

export const remove = async (req: IRequestUser, res: Response, next: NextFunction) => {
    const { taskId } = req.params
    const { sectionId } = req.body

    try {
        const task = await Task.findById(taskId)
        if (!task)
            return res.status(404).json({
                status: 'error',
                message: 'Not found this task.',
            })

        await Task.deleteOne({ _id: taskId })
        const tasks = await Task.find({ section: sectionId })

        const taskUpdateKeyAsync: any[] = []
        for (const key in tasks) {
            const ele = tasks[key]
            taskUpdateKeyAsync.push(
                Task.findByIdAndUpdate(ele.id, {
                    $set: {
                        position: key,
                    },
                })
            )
        }

        await Promise.all([taskUpdateKeyAsync])

        res.status(204).json({
            status: 'success',
            data: null,
        })
    } catch (error: any) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        })
    }
}
