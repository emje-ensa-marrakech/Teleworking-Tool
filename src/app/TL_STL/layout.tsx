"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Calendar, Settings, Users } from "lucide-react";

import { Header } from "../components/tlHeader";

interface Stats {
  name: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [data, setData] = useState<Stats | null>(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const id = localStorage.getItem("id") || sessionStorage.getItem("id");

    fetch(`/api/generale/getStats?id=${id}`, {
      headers: {
        Authorization: token!,
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.json().then((d: Stats) => {
        console.log(d);
        setData(d);
      })
    );
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl text-green-400 font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-[164px] bg-gradient-to-b from-green-500 to-blue-500 p-5 text-white flex flex-col">
        <Image
          width={100}
          height={100}
          src="/avl.png"
          alt="User"
          className="w-28 h-14 rounded-lg mb-16"
        />
        <nav className="flex flex-col flex-grow space-y-4">
          <Link
            href="/TL_STL/home"
            className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black p-2"
          >
            <Home size="24" />
            <span>Home</span>
          </Link>

          <Link
            href="/TL_STL/booking"
            className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black p-2"
          >
            <Calendar size="24" />
            <span>Booking</span>
          </Link>

          <Link
            href="/TL_STL/attendance"
            className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black p-2"
          >
            <Users size="24" />
            <span>Attendance</span>
          </Link>

          <div className="flex-1"></div>
          <Link
            href="/TL_STL/settings"
            className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black p-2 mt-auto"
          >
            <Settings size="24" />
            <span>Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto">
        <Header userName={data.name} />
        <h3 className="text-2xl m-2 font-semibold">Welcome {data.name} 👋</h3>

        {/* Main Content */}
        {children}
      </main>
    </div>
  );
}
