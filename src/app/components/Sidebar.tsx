"use client";
import Link from "next/link";
import Image from "next/image";
import { Home, Calendar, Settings, Map, FileUser } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-full md:w-[164px] bg-gradient-to-b from-green-500 to-blue-500 p-5 text-white flex flex-col">
      <Image
        width={100}
        height={100}
        src="/avl.png"
        alt="User"
        className="w-28 h-14 rounded-lg mb-16"
      />

      <nav className="flex flex-col flex-grow space-y-4">
        <SidebarLink href="/RH/home" icon={<Home size={24} />} label="Home" />
        <SidebarLink href="/RH/spaces" icon={<Map size={24} />} label="Spaces" />
        <SidebarLink href="/RH/booking" icon={<Calendar size={24} />} label="Booking" />
        <SidebarLink href="/RH/collaborators" icon={<FileUser size={24} />} label="Collaborators" />
        <div className="flex-1"></div>
        <SidebarLink href="/RH/settings" icon={<Settings size={24} />} label="Settings" />
      </nav>
    </aside>
  );
}

function SidebarLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black p-2"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
