import { PrismaClient } from "@prisma/client";
import argon from "argon2"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const prisma = new PrismaClient()
    const data = await req.json()

    const user = await prisma.user.findUnique(
        {
            where: {
                email: data.email
            }
        }
    )
    console.log(data.password, user!.password);
    
    if (user) {
        
        if (await argon.verify(user.password,data.password)) {
            const token = await jwt.sign(data.email, `${process.env.TOKEN}`)
            return NextResponse.json(
                {
                    "status": "done",
                    "jwt": token,
                    "type" : user.type,
                    "id":user.id
                }
            )
        } else {
            return NextResponse.json(
                {
                    "status": "error",
                    "msg":"invalid password"
                }
            )
        }
    } else{
        return NextResponse.json(
            {
                "status" : "error",
                "msg" : "invalid user"
            }
        )
    }
}