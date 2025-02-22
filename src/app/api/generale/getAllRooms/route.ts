import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req: NextRequest) {
    const prisma = new PrismaClient()
    const data = await req.json()

    if (data.RHid && data.roomId) {
        const user = await prisma.user.findUnique(
            {
                where: {
                    id: Number(data.RHid)
                }
            }
        )

        if (user) {
            if (user.type == "RH") {
                const room = await prisma.workspace.findUnique({
                    where: {
                        id: Number(data.roomId)
                    }
                })

                const reservations = (await prisma.reservation.findMany(
                    {
                        where: {
                            workspaceID: Number(data.roomId)
                        }
                    }
                )).map(
                    (e) => {
                        const { id, time, confirmed } = e
                        return { id, time, confirmed }
                    }
                ) // getting eservations for the room

                return NextResponse.json(
                    reservations
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
                "msg": "invalid parametrs"
            },
            {
                status: 400
            }
        )
    }
}