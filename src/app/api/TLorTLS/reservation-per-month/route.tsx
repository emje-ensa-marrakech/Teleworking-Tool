import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";// Ensure Prisma is configured

export async function GET() {
    const prisma = new PrismaClient();
  try {
    const reservationData = await prisma.reservation.groupBy({
      by: ["time"], // Assuming 'time' is a Date field
      _count: { id: true }, // Count reservations
    });

    // Process data to group by month
    const reservationsPerMonth: { [key: string]: number } = {};

    reservationData.forEach((item) => {
      const month = new Date(item.time).toLocaleString("default", { month: "long", year: "numeric" });
      reservationsPerMonth[month] = (reservationsPerMonth[month] || 0) + item._count.id;
    });

    // Convert object to an array for the chart
    const formattedData = Object.entries(reservationsPerMonth).map(([month, value]) => ({
      name: month,
      value,
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching reservations per month:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
