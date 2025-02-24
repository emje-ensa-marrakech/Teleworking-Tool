import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const prisma = new PrismaClient()
    const data = await req.json()

    if(data.id){
        const user = await prisma.user.findUnique(
            {
                where : {
                    id: data.id
                }
            }
        )

        if(user) {
            return NextResponse.json(
                user
            )
        } else {
            return NextResponse.json(
                {
                    "status" : "error",
                    "msg": "no user given"     
                }
            )
        }
    }else {
        return NextResponse.json(
            {
                "status" : "error",
                "msg": "no id given"
            }
        )
    }
    
}