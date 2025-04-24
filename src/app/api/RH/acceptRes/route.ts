import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function PUT(req: NextRequest) {
  const prisma = new PrismaClient();
  const data = await req.json();

  if (data.resId && data.RHid) {
    const RH = await prisma.user.findUnique({
      where: {
        id: Number(data.RHid),
      },
    });

    if (RH) {
      if (RH.type == "RH") {
        const reservation = await prisma.reservation.findUnique({
          where: {
            id: Number(data.resId),
          },
        });

        if (reservation) {
          if (reservation.confirmed) {
            return NextResponse.json({
              status: "error",
              msg: "already accepted",
            });
          } else {
            return NextResponse.json({
              status: "done",
              msg: "reservation confirmed",
            });
          }
        } else {
          return NextResponse.json({
            status: "error",
            msg: "invalid reservation",
          });
        }
      } else {
        return NextResponse.json(
          {
            status: "error",
            msg: "invalid user type",
          },
          {
            status: 403,
          }
        );
      }
    } else {
      return NextResponse.json(
        {
          status: "error",
          msg: "invalid RH id",
        },
        {
          status: 400,
        }
      );
    }
  } else {
  }
}
