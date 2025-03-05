import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; // Make sure this path matches your Prisma setup

export async function PATCH(req: Request, context: { params: { id: string } }) {
    const prisma = new PrismaClient();
    const { id } = await context.params; // Get reservation ID from URL
    const { confirmed } = await req.json(); // Get new confirmed status from request body

    try {
        // Update the reservation in the database
        const updatedReservation = await prisma.reservation.update({
            where: { id: parseInt(id) },
            data: { confirmed },
        });

        return NextResponse.json({ success: true, reservation: updatedReservation });
    } catch (error) {
        console.error("Error updating reservation:", error);
        return NextResponse.json({ success: false, message: "Database update failed" }, { status: 500 });
    }
}
