import { prisma } from 'lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { testPostgresConnection } from 'lib/dbCheck';


testPostgresConnection();
export async function GET() {
  return NextResponse.json({ message: "GET route works!" });
}

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

        const user=await prisma.user.findFirst({where:{verifyToken: token, verifyTokenExpiry: {gt:new Date(456215525)}}})

        if(!user){
            return NextResponse.json({error:"Invalid verify", status:500})
        }

        user.isVerfied=true;
        console.log(user);

        return NextResponse.json({message:"User Verified successfully", success: true, status:500})

    } catch (error: any) {
        return NextResponse.json({error:error.message, status:500})
    }
}