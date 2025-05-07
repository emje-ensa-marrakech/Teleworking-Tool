import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Helper functions
const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateType = (type: string) => ['collaborateur'].includes(type); // Only allow 'collaborateur' type

// GET all collaborators (only those with type 'collaborateur')
export async function GET(request: Request) {
  try {
    const collaborators = await prisma.user.findMany({
      where: { type: 'collaborateur' }, // Only fetch collaborators
      select: {
        id: true,
        name: true,
        email: true,
        gender: true,
        department: true,
        workshours: true,
        personalNumber: true,
        type: true,
        Reservation: {
          select: {
            id: true,
          },
        },
      },
      orderBy: { name: 'asc' }
    });

    return NextResponse.json({ data: collaborators }, { status: 200 });
  } catch (error) {
    console.error("Error fetching collaborators:", error);
    return NextResponse.json(
      { error: "Failed to fetch collaborators" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// CREATE new collaborator
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validation
    if (!validateEmail(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    if (!body.password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }
    if (!body.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!body.personalNumber) {
      return NextResponse.json({ error: "Personal number is required" }, { status: 400 });
    }

    // Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email }
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Create new collaborator (always with type 'collaborateur')
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: await argon2.hash(body.password),
        type: 'collaborateur', // Force type to be collaborateur
        gender: body.gender,
        department: body.department,
        personalNumber: Number(body.personalNumber),
        workshours: Number(body.workshours),
      },
      select: {
        id: true,
        name: true,
        email: true,
        gender: true,
        department: true,
        personalNumber: true,
        workshours: true,
        type: true
      }
    });

    return NextResponse.json(
      { 
        data: newUser, 
        message: "Collaborator added successfully" 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error adding a collaborator:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}