import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req: NextRequest) {
    const prisma = new PrismaClient()
    const data = await req.json()

    if (data.RHid) {
        const user = await prisma.user.findUnique(
            {
                where: {
                    id: data.RHid
                }
            }
        )

        if (user) {
            if(user.type == "RH") {
                const rooms = (await prisma.salle.findMany({})).map(
                    (e)=>{
                        const {name,id} = e
                        return {id,name}
                    }
                )
                
                return NextResponse.json(
                    rooms
                )
            } else {
                return NextResponse.json(
                    {
                        "status": "error",
                        "msg": "invalid user type"
                    },
                    {
                        status: 403
                    }
                )    
            }
         } else {
            return NextResponse.json(
                {
                    "status": "error",
                    "msg": "no user found"
                },
                {
                    status: 400
                }
            )
        }
    } else {
        return NextResponse.json(
            {
                "status": "error",
                "msg": "no 'RHid' found in body"
            },
            {
                status: 400
            }
        )
    }
}