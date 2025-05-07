import Image from "next/image";
import { Bell } from "lucide-react";

export function Header( {userName}: { userName: string }) {
  return (
    <div className="flex flex-col p-5 md:flex-row bg-white justify-between items-center mb-3 shadow-lg">
      <Image
        width={100}
        height={100}
        src="/logo.png"
        alt="User"
        className="w-20 h-25 rounded-2"
      />
      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <div className="bg-gradient-to-r from-[rgba(69,168,72,0.5)] to-[rgba(1,166,187,0.5)] font-bold text-black px-8 py-2 rounded-xl">
          TL_STL
        </div>
        <Bell className="text-gray-700" />
        <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
          {userName.charAt(0).toUpperCase()}
        </div>
        <span>{userName}</span>
      </div>
    </div>
  );
}
