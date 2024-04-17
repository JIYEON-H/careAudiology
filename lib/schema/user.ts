import db from '@/lib/db'

export const checkUsernameExists = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    })
    return Boolean(user)
  } catch (error) {
    console.error(error)
  }
}
