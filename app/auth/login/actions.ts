'use server'
import { PASSWORD_MIN_LENGTH } from '@/lib/constrants'
import { z } from 'zod'
import db from '@/lib/db'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import getSession from '@/lib/session'

const checkUsernameExists = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  })
  return Boolean(user)
}

const formSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
    })
    .trim()
    .refine(checkUsernameExists, "Username doesn't exist"),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(PASSWORD_MIN_LENGTH),
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
})

export async function loginAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    password: formData.get('password'),
  }

  const result = await formSchema.spa(data)

  if (!result.success) {
    return result.error.flatten()
  } else {
    const user = await db.user.findUnique({
      where: {
        username: result.data.username,
      },
      select: {
        id: true,
        password: true,
      },
    })

    const ok = user && result.data.password === user.password

    if (ok) {
      const session = await getSession()
      session.id = user!.id
      await session.save()
      redirect('/')
    } else {
      return {
        fieldErrors: {
          password: ['Wrong password'],
          username: [],
        },
      }
    }
  }
}
