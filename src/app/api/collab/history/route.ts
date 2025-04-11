
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


export async function GET(req: NextRequest) {
    const prisma = new PrismaClient();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
  
    if (id) {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });
  
      if (user) {
        const rese = await prisma.reservation.findMany({
          where: {
            userId: Number(user.id),
          },
        });
  
        return NextResponse.json(rese); // ✅ wrap in NextResponse
      } else {
        return NextResponse.json({ status: "error", msg: "user not found" });
      }
    } else {
      return NextResponse.json({
        status: "error",
        msg: "Missing user id",
      });
    }
  }
  