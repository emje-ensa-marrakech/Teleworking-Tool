import { PrismaClient } from "@prisma/client";
import argon from "argon2"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";
import { emit } from "process";

export async function POST(req: Request) {
    const prisma = new PrismaClient()
    const data = await req.json()
     try{

        const user = await prisma.user.findUnique(
            {
                where: {
                    email: data.email
                }
            }
        )

        if (user) {

            if (await argon.verify(user.password, data.password)) {
                const token = jwt.sign(
                    { email: data.email }, // Payload must be an object
                    process.env.TOKEN!,   // Secret key
                    { algorithm: 'HS256' } // Explicitly set the algorithm
                )

                return NextResponse.json(
                    {
                        "status": "done! User successfuly signed in",
                        "jwt": token,
                        "type": user.type,
                        "id": user.id
                    }
                )
            } else {
                return NextResponse.json(
                    {
                        "status": "error",
                        "msg": "invalid password"
                    },
                    {
                        status :401
                    }
                )
            }
        } else {
            return NextResponse.json(
                {
                    "status": "error",
                    "msg": "invalid user"
                },
                {
                    status :400
                }
            )
        }
    }
    catch(e){
        return NextResponse.json({
                status: "error",
                message: `Unknown error: ${e}`
            });
    }
}