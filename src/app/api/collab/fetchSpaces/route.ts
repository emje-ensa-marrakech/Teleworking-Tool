import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const spaces = await prisma.workspace.findMany({
      where: {
        status: true,  // Ensure only active workspaces are shown
      },
    });

    return NextResponse.json({
      status: "done",
      spaces,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        msg: "Failed to fetch workspaces",
      },
      { status: 500 }
    );
  }
}
