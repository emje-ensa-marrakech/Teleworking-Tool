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
                <div className="nav2">
            <div className="logo2">
                <img src="./booking/image-removebg-preview 4.png" alt=""/>
            </div>
            <div className="conent">
                <a href="#">
                    <div className="li">
                    <img src="./booking/home.png" alt=""/>
                        <h6>Home</h6>
                    </div>
                </a>
                
                <a href="#">
                    <div className="li">
                        <img src="./booking/map.png" alt=""/>
                        <h6>Spaces</h6>
                    </div>
                </a>
                
                <a href="#">
                    <div className="li">
                        <img src="./booking/calendar.png" alt=""/>
                        <h6>Booking</h6>
                    </div>
                </a>
                
                <a href="#">
                    <div className="li">
                        <img src="./booking/person.png" alt=""/>
                        <h6>Collaborators</h6>
                    </div>
                </a>
            </div>
            <a href="#">
                <div className="li">
                    <img src="./booking/settings.png" alt=""/>
                    <h6>Settings</h6>
                </div>
            </a>

        </div>
            </div>
            <div className="flex flex-col">

                {children}
            </div>
        </main>
    );
}
