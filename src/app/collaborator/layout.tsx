"use client";
import Image from "next/image";
import Link from "next/link";
import { IoNotificationsOutline } from "react-icons/io5";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex bg-[rgb(246,255,255)]">
      <div className="w-[7.3vw] h-[100vh] bg-gradient-to-b from-[rgba(74,166,89)] to-[rgba(1,166,187)]">
        <Image src={"/white-logo.png"} width={100} height={100} alt={"logo"} />
        <div className="nav2">
          <div className="conent">
            <Link href="/collaborator/home">
              <div className="li">
                <Image src="/booking/home.png" alt="" width={10} height={10} />
                <h6>Home</h6>
              </div>
            </Link>

            <Link href="/collaborator/map">
              <div className="li">
                <Image src="/booking/map.png" width={10} height={10} alt="" />
                <h6>Map</h6>
              </div>
            </Link>

            
          </div>
          <Link href="/settings">
            <div className="li">
              <Image
                src="/booking/settings.png"
                width={10}
                height={10}
                alt=""
              />
              <h6>Settings</h6>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col">{children}</div>
    </main>
  );
}
