import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const prisma = new PrismaClient()
    const data = await req.json()

    if(data.floor || data.name){
        
        if(!data.floor){
            return await prisma.salle.findMany(
                {
                    where : {
                        name :data.name,
                    }
                }
            )
            
        } else if (!data.name){
            return  await prisma.salle.findMany(
                {
                    where : {
                        floor :data.floor,
                    }
                }
            )
            
        } else {
            return  await prisma.salle.findMany(
                {
                    where : {
                        floor :data.floor,
                        name : data.name
                    }
                }
            )

        }
    } else {
        return NextResponse.json(
            {
                "status" : "error",
                "msg" : "no paramaters found"
            },{
                status : 400
            }
        )
    }
}