import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  const data = await req.json();

  // Validate input parameters
  if (!data.userId || !data.reservationDate || !data.spaceId) {
    return NextResponse.json(
      {
        status: "error",
        msg: "Invalid parameters",
      },
      { status: 400 }
    );
  }

  const userId = Number(data.userId);
  const workspaceId = Number(data.spaceId);
  const date = new Date(data.reservationDate);

  // Validate that the date is not in the past
  if (date < new Date()) {
    return NextResponse.json(
      {
        status: "error",
        msg: "Cannot reserve in the past",
      },
      { status: 400 }
    );
  }

  // Check if the workspace exists
  const workspace = await prisma.workspace.findUnique({
    where: {
      id: workspaceId,
    },
  });

  if (!workspace) {
    return NextResponse.json(
      {
        status: "error",
        msg: "Workspace not found",
      },
      { status: 404 }
    );
  }

  // Check if the user exists (Optional but good practice)
  const user = await prisma.user.findUnique({
    where: {
      id: userId,

    },
  });

  if (!user) {
    return NextResponse.json(
      {
        status: "error",
        msg: "User not found",
      },
      { status: 404 }
    );
  }

  // Check if the workspace is already reserved for the selected time
  const existingReservation = await prisma.reservation.findFirst({
    where: {

      workspaceID: workspaceId,
      time: date,

    },
  });

  if (existingReservation) {
    return NextResponse.json(
      {
        status: "error",
        msg: "Room already taken",
      },
      { status: 400 }
    );
  }

  // Create the reservation
  const reservation = await prisma.reservation.create({
    data: {
      workspaceID: workspaceId,
      userId: userId,
      time: date,
      workspaceName: workspace.name,
      floor: `${workspace.floor}`,

      confirmed: false,
    },
  });

  return NextResponse.json({
    status: "done",
    reservationId: reservation.id,
    msg: "Reservation pending confirmation",
  });
}
