import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";// Ensure Prisma is configured

export async function GET() {
  const prisma = new PrismaClient();
  try {
    // Count reservations per workspace
    const reservationData = await prisma.reservation.groupBy({
      by: ["workspaceID"],
      _count: { id: true }, // Count reservations
    });

    // Fetch workspace names based on workspaceIDs
    const workspaceIDs = reservationData.map((item) => item.workspaceID);
    const workspaces = await prisma.workspace.findMany({
      where: { id: { in: workspaceIDs } }, // Get workspaces matching IDs
      select: { id: true, name: true }, // Select only relevant fields
    });

    // Convert workspaces to a map for easy lookup
    const workspaceMap = Object.fromEntries(
      workspaces.map((w) => [w.id, w.name])
    );

    // Format data for the chart
    const formattedData = reservationData.map((item) => ({
      name: workspaceMap[item.workspaceID] || `Workspace ${item.workspaceID}`, // Get real name
      value: item._count.id, // Number of reservations
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
