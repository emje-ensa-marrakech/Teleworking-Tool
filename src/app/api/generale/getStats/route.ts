import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
  
    const prisma = new PrismaClient()


    if (id) {
        const rooms = await prisma.workspace.findMany(
            {

            }
        )

        const reservation = await prisma.reservation.findMany(
            {
                where : {}
            }
        )

        const user = await prisma.user.findUnique(
            {
                where : {
                    id : Number(id)
                }
            }
        )

        // const notification = await prisma.notification.findMany(
        //     {
        //         where : {
        //             userId : Number(id)
        //         }
        //     }
        // )

        // await prisma.notification.updateMany(
        //     {
        //         where : {
        //             userId : Number(id)
        //         },
        //         data : {
        //             seen : true
        //         }
        //     }
        // )
        const avilabe = rooms.filter((e)=>e.status)

        const rese = await prisma.reservation.findMany({})
        const pending = rese.filter((e=>!e.confirmed)).length
        const last4 = rese.filter((e)=>e.userId == Number(id)).slice(0,3)
        const resMad = rese.filter((e)=>e.userId == Number(id))

        return NextResponse.json(
            {
                "name": user!.name,
                // "notifications": notification,
                "available": avilabe.length,
                "your" : resMad.length,
                "total" : reservation.length,
                "salles" : rooms.length,
                "last" : last4,
                "pending" : pending
            }
        )

    } else {
        return NextResponse.json(
            {
                "status": "error",
                "msg": "no id given"
            },
            {
                status: 400
            }
        )
    }
}