import { Prisma, PrismaClient } from "@prisma/client";
import argon from "argon2";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";


const validateEmail = (email: string) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export async function POST(req: Request) {
    const prisma = new PrismaClient();
    const data = await req.json();

    try {

        if (!validateEmail(data.email)) {
            return NextResponse.json({
                status: "error",
                msg: "invalid email"
            });
        }

        // check user type 
        if (data.type != "TLorSTL" && data.type != "collaborateur" && data.type != "RH") {
            return NextResponse.json({
                status: "error",
                msg: "invalid type"
            });
        }

        const hashedPassword = await argon.hash(data.password);

        const user = await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: hashedPassword,
                type: data.type,
            }
        });

        const token = jwt.sign(
            { email: data.email }, // Payload must be an object
            process.env.TOKEN!,   // Secret key
            { algorithm: 'HS256' } // Explicitly set the algorithm
        );



        return NextResponse.json({
            status: "done! User successfuly signedup!",
            token: token,
            userId: user.id
        });
    } catch (error: unknown) {

        // making an output depending on the user type
        if (error.code === 'P2002') {
            return NextResponse.json({
                status: "error",
                message: 'Unique constraint violation: A user with this email already exists.'
            });
        } if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({
                status: "error",
                message: `Prisma Error Code: ${error.code}`
            });

            // Example: Handle Unique Constraint Violation (P2002)
        }
        else if (error instanceof Prisma.PrismaClientValidationError) {
            return NextResponse.json({
                status: "error",
                message: `Validation error: ${error.message}`
            });
        } else {
            return NextResponse.json({
                status: "error",
                message: `Unknown error: ${error}`
            });
        }
    }
}