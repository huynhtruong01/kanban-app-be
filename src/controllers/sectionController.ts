import { NextFunction, Response } from 'express'
import { Section, Task } from '../models'
import { IRequestUser } from '../types'

export const create = async (req: IRequestUser, res: Response, next: NextFunction) => {
    const { boardId } = req.body

    try {

        const newSection = await Section.create({ board: boardId })
        newSection._doc.tasks = []

        res.status(201).json({
            status: 'success',
            data: {
                section: newSection,
            },
        })
    } catch (error: any) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        })
    }
}

export const update = async (req: IRequestUser, res: Response, next: NextFunction) => {
    const { sectionId } = req.params

    try {
        const section = await Section.findById(sectionId)
        if (!section)
            return res.status(404).json({
                status: 'error',
                message: 'Not found this section.',
            })

        const newSection = await Section.findByIdAndUpdate(
            sectionId,
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
                section: newSection,
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
    const { sectionId } = req.params

    try {
        await Task.deleteMany({ section: sectionId })
        await Section.findByIdAndDelete(sectionId)

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
