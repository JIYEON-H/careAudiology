import { NextRequest } from 'next/server'
import getSession from './lib/session'

export async function middleware(request: NextRequest) {
  const session = await getSession()
  // console.log('session', session)
  if (request.nextUrl.pathname === '/' && !session.id) {
    return Response.redirect(new URL('/auth/login', request.url))
  }
}
