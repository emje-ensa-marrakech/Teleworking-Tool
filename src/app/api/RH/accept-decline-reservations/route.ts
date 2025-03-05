import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function PUT(req: NextRequest) {
  const prisma = new PrismaClient();
  const data = await req.json();

  // Validate request data
  if (!data.resId || !data.RHid || !data.action) {
    return NextResponse.json(
      { status: "error", msg: "Missing data" },
      { status: 400 }
    );
  }

  try {
    // Verify if the user is an RH
    const RH = await prisma.user.findUnique({
      where: { id: data.RHid },
    });

    if (!RH || RH.type !== "RH") {
      return NextResponse.json(
        { status: "error", msg: "Unauthorized access" },
        { status: 403 }
      );
    }

    // Find the reservation
    const reservation = await prisma.reservation.findUnique({
      where: { id: data.resId },
    });

    if (!reservation) {
      return NextResponse.json(
        { status: "error", msg: "Invalid reservation" },
        { status: 404 }
      );
    }

    // Update reservation status based on the action
    const updatedReservation = await prisma.reservation.update({
      where: { id: data.resId },
      data: { confirmed: data.action === "accept" },
    });

    return NextResponse.json({
      status: "success",
      msg: `Reservation ${data.action === "accept" ? "confirmed" : "declined"}`,
      reservation: updatedReservation,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { status: "error", msg: "Server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
