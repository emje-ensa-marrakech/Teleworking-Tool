import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client" // Ensure Prisma is configured

export async function GET() {
    const prisma = new PrismaClient();
  try {
    // Group reservations by departementID and count them
    const reservationData = await prisma.reservation.groupBy({
      by: ["userId"],
      _count: { id: true }, // Count reservations per departement
    });

    // Get user department names based on userIDs
    const userIDs = reservationData.map((item) => item.userId);
    const users = await prisma.user.findMany({
      where: { id: { in: userIDs } }, // Get users matching IDs
      select: { id: true, department: true }, // Select only relevant fields
    });

    // Create a map for quick lookup
    const userMap = Object.fromEntries(
      users.map((u) => [u.id, u.department || "Unknown"]) // Default to "Unknown" if null
    );

    // Format data for the chart
    const formattedData = reservationData.map((item) => ({
      name: userMap[item.userId], // Get department name
      value: item._count.id, // Number of reservations
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching reservation rate by departement:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
