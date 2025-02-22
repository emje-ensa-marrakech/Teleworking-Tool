import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient();
    const data = await req.json();

    if (data.id && data.time && data.workspaceId) {
        const date = new Date(data.time)

        const workspace = await prisma.workspace.findUnique(
            {
                where: {
                    id: Number(data.workspaceId)
                }
            }
        )
        if (workspace) {
            const res = await prisma.reservation.findFirst(
                {
                    where: {
                        workspaceID: data.workspaceId,
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
                        workspaceID: Number(data.workspaceId),
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