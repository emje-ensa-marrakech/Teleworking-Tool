import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient();
    const data = await req.json();

    if (data.id && data.time && data.salleId) {
        const date = new Date(data.time)

        const salle = await prisma.salle.findUnique(
            {
                where: {
                    id: Number(data.salleId)
                }
            }
        )
        if (salle) {
            const res = await prisma.reservation.findFirst(
                {
                    where: {
                        salleID: data.salleId,
                        time: date
                    }
                }
            )

            if (res) {
                return NextResponse.json(
                    {
                        "status": "error",
                        "msg": "room already taken"
                    }
                )
            }

            const reservation = await prisma.reservation.create(
                {
                    data: {
                        salleID: Number(data.salleId),
                        userId: Number(data.id),
                        time: new Date(date),
                        confirmed: false

                    },
                }
            )

            return NextResponse.json(
                {
                    "status": "done",
                    "reservation": reservation.id
                }
            )


        } else {
            return NextResponse.json(
                {
                    "status": "error",
                    "msg": "no room found"
                }, {
                status: 400
            }
            )
        }
    } else {
        return NextResponse.json(
            {
                "status": "error",
                "msg": "invalid parametrs"
            }, {
            status: 400
        }
        )
    }
}