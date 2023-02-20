import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const url = process.env.DB_URL
        await mongoose.connect(url as string)

        console.log('Connect DB success.')
    } catch (error: any) {
        console.log(error)
        console.log('Connect DB failed.')
    }
}
