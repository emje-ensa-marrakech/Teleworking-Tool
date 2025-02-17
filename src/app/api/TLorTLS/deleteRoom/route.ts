import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient()
    const data = await req.json()

    if (data.resId && data.RHid) {
        const user = await prisma.user.findUnique(
            {
                where: {
                    id: Number(data.RHid)
                }
            }
        )

        if (user) {
            if (user.type != "TLorTLS") {
                return NextResponse.json(
                    {
                        "status": "error",
                        "msg": "invalid user type"
                    }, {
                    status: 403
                }
                )
            } else {
                await prisma.salle.delete(
                    {
                        where: {
                            id: data.resId
                        }
                    }
                )

                return NextResponse.json(
                    {
                        "status": "done",
                        "msg": "salle deleted",
                    }
                )
            }
        } else {
            return NextResponse.json(
                {
                    "status": "error",
                    "msg": "invalid user"
                }, {
                status: 400
            }
            )
        }
    } else {
        return NextResponse.json(
            {
                "status": "error",
                "msg": "invalid parameters"
            }, {
            status: 400
        }
        )
    }
}