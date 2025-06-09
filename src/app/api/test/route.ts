import { testPostgresConnection } from 'lib/dbCheck';
import { NextResponse, NextRequest } from 'next/server';
testPostgresConnection();


export async function GET() {
  return NextResponse.json({ status: 'GET OK at /api/users/signup' });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ status: 'POST OK', received: body });
}

