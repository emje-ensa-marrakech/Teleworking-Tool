import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    const prisma = new PrismaClient()
    const data = await req.json()

    if (data.id){
        const user = await prisma.user.findUnique(
            {
                where : {
                    id: Number(data.id)
                }
            }
        )

        if(user){
            const rese = await prisma.reservation.findMany(
                {
                    where : {
                        userId : Number(user.id)
                    }
                }
            )
            return rese
        } else {
            return NextResponse.json(
                {
                    
                }
            )
        }
    }else {
        return NextResponse.json(
            {
                "status" : "error",
                "msg":"user not found"
            }
        )
    }
}