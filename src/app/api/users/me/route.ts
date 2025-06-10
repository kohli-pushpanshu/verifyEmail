import { prisma } from 'lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from 'helpers/getDataFromToken';

export async function GET() {
  return NextResponse.json({ message: "GET route works!" });
}

export default async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request); 
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: "User Found", data: user });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
