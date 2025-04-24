import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const collaborators = await prisma.user.findMany({
    where: { type: 'collaborateur' },
    include: { Reservation: true },
  });

  return NextResponse.json(collaborators);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newUser = await prisma.user.create({ data });
  return NextResponse.json(newUser);
}
