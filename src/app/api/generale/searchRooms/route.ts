import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const prisma = new PrismaClient();
    const data = await req.json();

    if (data.floor || data.name || data.departement) {
        
        let result;
        
        if (!data.floor && !data.departement) {
            result = await prisma.workspace.findMany({
                where: {
                    name: data.name,
                },
            });
        } else if (!data.name && !data.departement) {
            result = await prisma.workspace.findMany({
                where: {
                    floor: data.floor,
                },
            });
        } else if (!data.floor && !data.name) {
            result = await prisma.workspace.findMany({
                where: {
                    departement: data.departement,
                },
            });
        } else {
            result = await prisma.workspace.findMany({
                where: {
                    floor: data.floor,
                    name: data.name,
                },
            });
        }

        return NextResponse.json(result);

    } else {
        return NextResponse.json(
            {
                status: "error",
                msg: "No parameters found",
            },
            {
                status: 400,
            }
        );
    }
}
