"use client"
import Image from "next/image";
import { IoNotificationsOutline } from "react-icons/io5";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <main className="flex bg-[rgb(246,255,255)]">
            <div className="w-[10vw] h-[100vh] bg-gradient-to-b from-[rgba(74,166,89)] to-[rgba(1,166,187)]">
                <Image src={"/white-logo.png"} width={100} height={100} alt={"logo"} />
            </div>
            <div className="flex flex-col">

                {children}
            </div>
        </main>
    );
}
