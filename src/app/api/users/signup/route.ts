// app/api/register/route.ts (example file path)
import { PrismaClient } from '@prisma/client';
import { sendEmail } from 'helpers/mailer';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { testPostgresConnection } from 'lib/dbCheck';

testPostgresConnection();
const prisma = new PrismaClient();

export async function GET() {
  return NextResponse.json({ message: "GET route works!" });
}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    if (!email || !password || !username) {
      return NextResponse.json(
        { error: 'Username, Email, and Password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create the user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    

    // Send verification email
    await sendEmail({
      email,
      emailType: 'VERIFY',
      userId: user.id,
    });

    return NextResponse.json(
      {
        message: 'User registered successfully',
        success: true,
        user,
      },
      { status: 201 }
    );
    
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
