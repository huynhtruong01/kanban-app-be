import { NextFunction, Response } from 'express'
import { Board, Section, Task } from '../models'
import { resCheckAuth } from '../utils'
import { IBoard, IRequestUser, ISectionModel } from './../types'

export const create = async (req: IRequestUser, res: Response, next: NextFunction) => {
    try {
        const boardsCount = await Board.find().count()
        const newBoard = await Board.create({
            user: req?.user?.id,
            position: boardsCount > 0 ? boardsCount : 0,
        })

        res.status(201).json({
            status: 'success',
            data: {
                board: newBoard,
            },
        })
    } catch (error: any) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        })
    }
}

export const getAll = async (req: IRequestUser, res: Response, next: NextFunction) => {
    try {
        if (req.user) {
            const boards = await Board.find({ user: req.user.id }).sort('-position')

            res.status(200).json({
                status: 'success',
                data: {
                    boards,
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

export const updatePosition = async (
    req: IRequestUser,
    res: Response,
    next: NextFunction
) => {
    try {
        const { boards } = req.body

        for (const key in boards.reverse()) {
            const board: IBoard = boards[key]

            await Board.findByIdAndUpdate(board.id, {
                $set: {
                    position: key,
                },
            })
        }

        res.status(200).json({
            status: 'success',
        })
    } catch (error: any) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        })
    }
}

export const getOne = async (req: IRequestUser, res: Response, next: NextFunction) => {
    const { boardId } = req.params

    try {
        if (!req.user) return resCheckAuth(res)
        const board = await Board.findOne({ user: req.user.id, _id: boardId })
        if (!board)
            return res.status(404).json({
                status: 'failed',
                message: 'Board is not founded.',
            })

        const sections = await Section.find({ board: boardId })

        for (const section of sections) {
            const tasks = await Task.find({ section: section.id })
                .populate('section')
                .sort('-position')
            section._doc.tasks = tasks
        }

        board._doc.sections = sections
        res.status(200).json({
            status: 'success',
            data: {
                board,
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
    const { boardId } = req.params
    const { title, description, favorite, icon } = req.body

    try {
        if (!req.user) return resCheckAuth(res)

        if (icon === '') req.body.icon = '📜'
        if (title === '') req.body.title = 'Untitled'
        if (description === '') req.body.description = 'Add description here...'

        const currentBoard = await Board.findById(boardId)
        if (!currentBoard)
            return res.status(404).json({
                status: 'error',
                message: 'Not found this board.',
            })

        if (favorite !== undefined && currentBoard.favorite !== favorite) {
            const favorites = await Board.find({
                user: req.user.id,
                favorite: true,
            })

            if (favorite) {
                req.body.favoritePosition = favorites.length > 0 ? favorites.length : 0
            } else {
                const list: any[] = []
                for (const key in favorites) {
                    const ele = favorites[key]
                    list.push(Board.findByIdAndUpdate(ele.id, {
                        $set: {
                            favoritePosition: key,
                        },
                    }))

                    await Promise.all([list])
                }
            }
        }

        await Board.findByIdAndUpdate(boardId, {
            $set: req.body,
        })
    } catch (error: any) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        })
    }
}

export const getFavorite = async (
    req: IRequestUser,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) return resCheckAuth(res)

        const favorites = await Board.find({
            user: req.user.id,
            favorite: true,
        }).sort('-favoritePosition')

        res.status(200).json({
            status: 'success',
            data: {
                favorites,
            },
        })
    } catch (error: any) {
        res.status(500).json({
            status: 'failed',
            message: error.message,
        })
    }
}

export const updateFavoritePosition = async (
    req: IRequestUser,
    res: Response,
    next: NextFunction
) => {
    const { favorites } = req.body

    try {
        for (const key in favorites.reverse()) {
            const favorite = favorites[key]
            await Board.findByIdAndUpdate(favorite.id, {
                $set: {
                    favoritePosition: key,
                },
            })
        }

        res.status(200).json({
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

export const remove = async (req: IRequestUser, res: Response, next: NextFunction) => {
    const { boardId } = req.params

    try {
        // TODO: delete all section have boardId
        const sections = await Section.find({ boardId })
        const deleteManySections = sections.forEach((section: ISectionModel) => {
            Task.deleteMany({ sectionId: section._id })
        })

        await Promise.all([deleteManySections])

        // TODO: update all favorites position
        const board = await Board.findById(boardId)
        if (board?.favorite) {
            const favorites = await Board.find({
                user: board.user,
                favorite: true,
                _id: {
                    $ne: boardId,
                },
            }).sort('favoritePosition')

            for (const key in favorites) {
                const element = favorites[key]
                await Board.findByIdAndUpdate(element.id, {
                    $set: { favoritePosition: key },
                })
            }
        }

        // TODO: delete board
        await Board.deleteOne({ _id: boardId })

        // TODO: update all position of board
        const boards = await Board.find().sort('position')
        for (const key in boards) {
            const board = boards[key]
            await Board.findByIdAndUpdate(board.id, { $set: { position: key } })
        }

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
