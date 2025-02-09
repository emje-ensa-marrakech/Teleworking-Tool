import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import argon from "argon2"

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient()
    const data = await req.json()

    if (data.RHid && data.collabName && data.collabEmail && data.collabPassword) {
        const user =await prisma.user.findUnique({
           where: {
            id : data.RHid
           }
        })

      if (user){
            if(user.type == "RH") {
                let hashedPassword = await argon.hash(data.collabName)

                const collab = await prisma.user.create(
                    {
                        data : {
                            type : "collaborateur",
                            name : data.collabName,
                            password : hashedPassword,
                            email: data.collabEmail
                        }
                    }
                )
            }
        }
    } else {
        return NextResponse.json(
            {
                "status" : "error",
                "msg" : "invalid parametres"
            }
        )
    }
}
