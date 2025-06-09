import { NextRequest, NextResponse } from 'next/server';
import { testPostgresConnection } from 'lib/dbCheck';



testPostgresConnection()
export async function GET(request: NextRequest){
    try {
        const Response=NextResponse.json({
            message: "Logout Successfully",
            success: true
        })

        Response.cookies.set("Token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return Response;

    } catch (error) {
        return NextResponse.json({error:error.message, status:500})
    }
}