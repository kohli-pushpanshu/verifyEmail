import { prisma } from 'lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { testPostgresConnection } from 'lib/dbCheck';
import jwt from 'jsonwebtoken'





export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Wrong Password" },
        { status: 400 }
      );
    }

    const tokenPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    });

    const response = NextResponse.json(
      { message: "Logged In Success", success: true },
      { status: 200 }
    );

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
