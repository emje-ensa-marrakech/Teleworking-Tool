import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const reservations = await prisma.reservation.findMany({
            include: {
                user: true, // Fetch user data
                workspace: true, // Fetch workspace details
                Attendence: true, // Fetch attendance if it's a relation
            },
        });

        return NextResponse.json({ status: "success", reservations });
    } catch (error) {
        console.error("Error fetching reservations:", error);
        return NextResponse.json(
            { status: "error", message: "Failed to fetch reservations" },
            { status: 500 }
        );
    }
}
