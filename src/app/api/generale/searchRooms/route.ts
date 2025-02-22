import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const prisma = new PrismaClient()
    const data = await req.json()

    if(data.floor || data.name || data.departement){
        
        if(!data.floor && !data.departement){
            return await prisma.workspace.findMany(
                {
                    where : {
                        name :data.name,
                    }
                }
            )
            
        } else if (!data.name && !data.departement){
            return  await prisma.workspace.findMany(
                {
                    where : {
                        floor :data.floor,
                    }
                }
            )
            
        } 
        else if (!data.floor && !data.name){
            return  await prisma.workspace.findMany(
                {
                    where : {
                        departement :data.departement,
                    }
                }
            )
            
        }
        
        else {
            return  await prisma.workspace.findMany(
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