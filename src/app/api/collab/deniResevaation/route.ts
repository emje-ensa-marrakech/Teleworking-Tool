import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export default async function DELEtE(req : NextRequest) {
        const prisma = new PrismaClient()
        const data = await req.json()

        if (data.userId && data.resevationId) {
            const reser = await prisma.reservation.findUnique(
                {
                    where :{
                        id : Number(data.resevationId),
                        userId : Number(data.userId)
                    }
                }
            )
            if (reser){
                if (reser.confirmed) {
                    return NextResponse.json(
                        {
                            "status" : "error",
                            "msg": "enable to finish the action"
                        }
                    )
                }
                await prisma.reservation.delete(
                    {
                        where : {
                            id: Number(data.resevationId)
                        }
                    }
                )

                return NextResponse.json(
                    {
                        "status" : "done",
                    }
                )
            } else {
                return NextResponse.json(
                    {
                        "status" : "error",
                        "msg" : "resev not found"
                    }
                )
            }
        } else {
            return NextResponse.json({
                "status" :"error",
                "msg" : "not found parametrs"
            })
        }
}