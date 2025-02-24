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
            <div className="flex">
                <div className="w-[90vw] h-[fit-content] flex flex-row items-center justify-between pl-5 pr-5 bg-white">
                    <Image src={"/logo.png"} alt="Logo" width={180} height={38} />
                    <div className="flex items-center justify-center">
                        <div className=" bg-gradient-to-r from-[rgba(69,168,72,0.5)] to-[rgba(1,166,187,0.5)] p-3 rounded-xl mr-3">
                            Reserve Room
                        </div>
                        <IoNotificationsOutline className="mr-3 text-2xl" />
                        <h1>MARWA WAPJPJW</h1>
                    </div>
                </div>
                {children}
            </div>
        </main>
    );
}
