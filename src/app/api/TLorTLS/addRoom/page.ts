import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient()
    const data = await req.json()

    if (data.id && data.name && data.floor) {
        const user = await prisma.user.findUnique(
            {
                where: {
                    id: Number(data.id)
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
                const workspace = await prisma.workspace.create(
                    {
                        data: {
                            name: data.name,
                            floor : data.roof,
                            departement: data.departement,
                            status: false
                        }
                    }
                )

                return NextResponse.json(
                    {
                        "status": "done",
                        "msg": "workspace created",
                        "workspace id": workspace.id
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