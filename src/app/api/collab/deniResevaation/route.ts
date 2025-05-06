import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Define the DELETE method as part of the exported handler
export async function DELETE(req: NextRequest) {
    const prisma = new PrismaClient();
    const data = await req.json();

    if (data.userId && data.resevationId) {
        const reser = await prisma.reservation.findUnique({
            where: {
                id: Number(data.resevationId),
                userId: Number(data.userId),
            },
        });
        if (reser) {
            if (reser.confirmed) {
                return NextResponse.json({
                    status: "error",
                    msg: "Unable to finish the action",
                });
            }
            await prisma.reservation.delete({
                where: {
                    id: Number(data.resevationId),
                },
            });

            return NextResponse.json({
                status: "done",
            });
        } else {
            return NextResponse.json({
                status: "error",
                msg: "Reservation not found",
            });
        }
    } else {
        return NextResponse.json({
            status: "error",
            msg: "Missing parameters",
        });
    }
}
