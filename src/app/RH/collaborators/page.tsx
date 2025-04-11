import { Home, Calendar, Settings, Bell, Map, FileUser } from "lucide-react";
import Link from "next/link";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function CollaboratorsPage() {
  const collaborators = await prisma.user.findMany({
    where: { type: "collaborateur" },
  });

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      
      <aside className="w-64 bg-gradient-to-b from-green-400 to-blue-500 text-white flex flex-col justify-between">
      <div className="flex items-center justify-center h-16">
        <img src="../../booking/image-removebg-preview 4.png" alt="" />
      </div>
        <nav className="flex flex-col mt-16 flex-grow space-y-4">
          <Link
            href="/RH/home"
            className="flex flex-col items-center mt-18 space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black"
          >
            <Home size="48" />
            <div>
              <Link href="/analytics">Home</Link>
            </div>
          </Link>

          <Link
            href="/RH/spaces"
            className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black"
          >
            <Map size="48" />
            <div>Spaces</div>
          </Link>

          <Link
            href="/RH/booking"
            className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black"
          >
            <Calendar size="48" />
            <div>Booking</div>
          </Link>

          <Link
            href="/RH/collaborator"
            className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black"
          >
            <FileUser size="48" />
            <div>Collaborators</div>
          </Link>

          <Link
            href="/RH/settings"
            className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black mt-auto"
          >
            <Settings size="48" />
            <div className="flex flex-col items-center space-x-3  rounded-lg cursor-pointer hover:bg-white hover:text-black mt-auto">
              Settings
            </div>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Collaborators</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            + Add Collaborator
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Gender</th>
                <th className="text-left p-4">Department</th>
                <th className="text-left p-4">Work Hours</th>
                <th className="text-left p-4">Reservations</th>
              </tr>
            </thead>
            <tbody>
              {collaborators.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.gender}</td>
                  <td className="p-4">{user.department}</td>
                  <td className="p-4">{user.workshours}</td>
                  <td className="p-4">{user.Reservation?.length ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
