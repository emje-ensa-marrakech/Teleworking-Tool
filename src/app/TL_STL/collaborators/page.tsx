import { Home, Calendar, Settings, Map, FileUser } from "lucide-react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function CollaboratorsPage() {
  const collaborators = await prisma.user.findMany({
    where: { type: "collaborateur" },
    include: {
      Reservation: {
        select: {
          id: true,
        },
      },
    },
  });

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-green-400 to-blue-500 text-white flex flex-col justify-between">
        <div className="flex items-center justify-center h-16">
          <img src="../../booking/image-removebg-preview 4.png" alt="" />
        </div>
        <nav className="flex flex-col flex-grow space-y-4">
          <Link
            href="/TL_STL/home"
            className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black p-2"
          >
            <Home size="24" />
            <span>Home</span>
          </Link>

          <Link
            href="/TL_STL/spaces"
            className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black p-2"
          >
            <Map size="24" />
            <span>Spaces</span>
          </Link>

          <Link
            href="/TL_STL/collaborators"
            className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black p-2"
          >
            <FileUser size="24" />
            <span>Collaborators</span>
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

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Collaborators</h1>
          <Link
            href="/RH/collaborators/add"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            + Add Collaborator
          </Link>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left p-4 font-medium">Name</th>
                <th className="text-left p-4 font-medium">Email</th>
                <th className="text-left p-4 font-medium">Gender</th>
                <th className="text-left p-4 font-medium">Department</th>
                <th className="text-left p-4 font-medium">Work Hours</th>
                <th className="text-left p-4 font-medium">Reservations</th>
              </tr>
            </thead>
            <tbody>
              {collaborators.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{user.name || "-"}</td>
                  <td className="p-4">{user.email || "-"}</td>
                  <td className="p-4">{user.gender || "-"}</td>
                  <td className="p-4">{user.department || "-"}</td>
                  <td className="p-4">{user.workshours || "-"}</td>
                  <td className="p-4">{user.Reservation?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
