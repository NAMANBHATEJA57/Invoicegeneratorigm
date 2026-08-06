import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const validUser = process.env.ADMIN_USER || 'Rupali';
    const validPass = process.env.ADMIN_PASS || 'Admin@user1234';

    if (username === validUser && password === validPass) {
      // Create the response
      const response = NextResponse.json({ success: true });
      
      // Set the auth cookie
      response.cookies.set({
        name: 'admin_auth',
        value: 'true',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return response;
    }

    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Bad request' }, { status: 400 });
  }
}
