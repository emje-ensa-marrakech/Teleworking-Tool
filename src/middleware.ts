import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
    const key = request.headers.get("Authorization")

    if (!key) {
        return NextResponse.json(
            { success: false, message: 'authentication err' },
            { status: 403 }
        )
    }

    try {
        const secret = new TextEncoder().encode(process.env.TOKEN)
        
        await jwtVerify(key, secret ,{ algorithms: ['HS256']}) // Verify token using `jose`
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'authentication failed' },
            { status: 403 }
        )
    }
}

export const config = {
    matcher: ['/api/Collaborateur/:path*', '/api/RH/:path*', '/api/TlorSTL/:path*'],
}
