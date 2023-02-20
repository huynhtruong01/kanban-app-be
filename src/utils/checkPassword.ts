import bcrypt from 'bcrypt'

export const checkPassword = async (
    currentPassword: string,
    password: string
): Promise<boolean> => {
    return await bcrypt.compare(currentPassword, password)
}
