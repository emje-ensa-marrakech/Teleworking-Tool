import { PrismaClient } from "@prisma/client";
import argon from "argon2"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

const validateEmail = (email: string) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


export async function POST(req: Request) {
    const prisma = new PrismaClient()
    const data = await req.json()

    try {
        if (!validateEmail(data.email)) {
            return NextResponse.json(
                {
                    "status": "error",
                    "msg": "invalid email"
                }
            )
        }

        if (data.type != "TLorSTL" && data.type != "collaborateur" && data.type != "RH" ) {
            return NextResponse.json( 
                {
                    "status": "error",
                    "msg": "invalid type"
                }
            )
        }

        let hashedPassword = await argon.hash(data.password)
         
        let user = await prisma.user.create(
            {
                data: {
                    email: data.email,
                    name: data.name,
                    password: hashedPassword,
                    type: data.type,
                }
            }
        )
        const token = await jwt.sign(data.email, `${process.env.TOKEN}`)

        return NextResponse.json(
            {
                "status": "done",
                "token": token,
                "userId" : user.id
            }
        )
    } catch (e) {
        return NextResponse.json(
            {
                "status" : "error",
                "msg" : "email already used"
            }
        )
    }
}