import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Utility Functions
async function findUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}

async function findWorkspaceById(id: number) {
  return prisma.workspace.findUnique({ where: { id } });
}

function isRhUser(user: any) {
  return user?.type === "RH";
}

// Add Workspace
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    const data = await req.json();
    console.log("Received data (POST):", data);

    if (!data.userId || !data.name || !data.departement) {
      return NextResponse.json(
        {
          status: "error",
          msg: "Missing required parameters (userId, name, departement)",
        },
        { status: 400 }
      );
    }

    const user = await findUserById(Number(data.userId));
    if (!user)
      return NextResponse.json(
        { status: "error", msg: "User not found" },
        { status: 404 }
      );
    if (!isRhUser(user))
      return NextResponse.json(
        { status: "error", msg: "Unauthorized - RH access only" },
        { status: 403 }
      );

    const workspace = await prisma.workspace.create({
      data: {
        name: data.name,
        departement: data.departement,
        status: data.status || true,
        floor: data.floor ? Number(data.floor) : null,
        capacity: data.capacity ? Number(data.capacity) : null,
        available: data.available ? Number(data.available) : null,
      },
    });

    return NextResponse.json({
      status: "success",
      msg: "Workspace created successfully",
      data: workspace,
    });
  } catch (error) {
    console.error("Error creating workspace:", error);
    return NextResponse.json(
      { status: "error", msg: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Update Workspace
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Received data (PUT):", data);

    if (!data.userId || !data.workspaceId) {
      return NextResponse.json(
        {
          status: "error",
          msg: "Missing required parameters (userId, workspaceId)",
        },
        { status: 400 }
      );
    }

    const user = await findUserById(Number(data.userId));
    if (!user)
      return NextResponse.json(
        { status: "error", msg: "User not found" },
        { status: 404 }
      );
    if (!isRhUser(user))
      return NextResponse.json(
        { status: "error", msg: "Unauthorized - RH access only" },
        { status: 403 }
      );

    const existingWorkspace = await findWorkspaceById(Number(data.workspaceId));
    if (!existingWorkspace) {
      return NextResponse.json(
        { status: "error", msg: "Workspace not found" },
        { status: 404 }
      );
    }

    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.departement) updateData.departement = data.departement;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.floor !== undefined) updateData.floor = Number(data.floor);
    if (data.capacity !== undefined)
      updateData.capacity = Number(data.capacity);
    if (data.available !== undefined)
      updateData.available = Number(data.available);

    const updatedWorkspace = await prisma.workspace.update({
      where: { id: Number(data.workspaceId) },
      data: updateData,
    });

    return NextResponse.json({
      status: "success",
      msg: "Workspace updated successfully",
      data: updatedWorkspace,
    });
  } catch (error) {
    console.error("Error updating workspace:", error);
    return NextResponse.json(
      { status: "error", msg: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete Workspace
export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Received data (DELETE):", data);

    if (!data.userId || !data.workspaceId) {
      return NextResponse.json(
        {
          status: "error",
          msg: "Missing required parameters (userId, workspaceId)",
        },
        { status: 400 }
      );
    }

    const user = await findUserById(Number(data.userId));
    if (!user)
      return NextResponse.json(
        { status: "error", msg: "User not found" },
        { status: 404 }
      );
    if (!isRhUser(user))
      return NextResponse.json(
        { status: "error", msg: "Unauthorized - RH access only" },
        { status: 403 }
      );

    // First check if workspace has any reservations
    const reservations = await prisma.reservation.findMany({
      where: { workspaceID: Number(data.workspaceId) },
    });

    if (reservations.length > 0) {
      return NextResponse.json(
        {
          status: "error",
          msg: "Cannot delete workspace - it has active reservations",
          reservationCount: reservations.length,
        },
        { status: 400 }
      );
    }

    // Only delete if no reservations exist
    await prisma.workspace.delete({ where: { id: Number(data.workspaceId) } });

    return NextResponse.json({
      status: "success",
      msg: "Workspace deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting workspace:", error);
    return NextResponse.json(
      { status: "error", msg: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Get Workspaces
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const departement = searchParams.get("departement");
    console.log("Received userId (GET):", userId);

    if (!userId) {
      return NextResponse.json(
        { status: "error", msg: "Missing required parameter (userId)" },
        { status: 400 }
      );
    }

    const user = await findUserById(Number(userId));
    if (!user) {
      return NextResponse.json(
        { status: "error", msg: "User not found" },
        { status: 404 }
      );
    }

    const whereClause: any = {};
    if (departement) {
      whereClause.departement = departement;
    }

    const workspaces = await prisma.workspace.findMany({
      where: whereClause,
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ status: "success", data: workspaces });
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    return NextResponse.json(
      { status: "error", msg: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
