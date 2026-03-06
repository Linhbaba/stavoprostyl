import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (process.env.BASIC_AUTH_ENABLED !== 'true') {
    return NextResponse.next()
  }

  const auth = request.headers.get('authorization')

  if (auth) {
    const [scheme, encoded] = auth.split(' ')
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded)
      const [user, pass] = decoded.split(':')
      if (
        user === (process.env.BASIC_AUTH_USER || 'dev') &&
        pass === (process.env.BASIC_AUTH_PASS || 'dev')
      ) {
        return NextResponse.next()
      }
    }
  }

  return new NextResponse('Přístup odepřen', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Development"',
    },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
