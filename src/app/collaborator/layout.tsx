"use client";
import Image from "next/image";
import Link from "next/link";
import { Map } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen bg-[rgb(246,255,255)]">
      {/* Sidebar */}
      <div className="w-[8.6vw] h-full bg-gradient-to-b from-[rgba(74,166,89)] to-[rgba(1,166,187)]">
        <Image src={"/white-logo.png"} width={100} height={100} alt={"logo"} />
        <div className="nav2">
          <div className="conent">
            <Link href="/collaborator/home">
              <div className="li">
                <Image src="/booking/home.png" alt="" width={10} height={10} />
                <h6>Home</h6>
              </div>
            </Link>
            <Link href="/collaborator/spaces">
              <div className="li">
                <Map size="24" />
                <h6>Spaces</h6>
              </div>
            </Link>
          </div>
          <Link href="/settings">
            <div className="li">
              <Image src="/booking/settings.png" width={10} height={10} alt="" />
              <h6>Settings</h6>
            </div>
          </Link>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 h-full overflow-auto">{children}</div>
    </main>
  );
}
