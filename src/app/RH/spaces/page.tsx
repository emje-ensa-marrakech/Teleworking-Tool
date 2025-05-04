"use client";

import { useState } from "react";
import {
  Home,
  Calendar,
  Settings,
  Map,
  FileUser,
  Bell,
  Search,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import QuickStats from "./QuickStats";

interface Space {
  id: number;
  name: string;
  department: string;
  floors: number;
}

interface NewSpace {
  name: string;
  department: string;
  floors: string;
}

export default function AVLSpace() {
  const [showAddSpace, setShowAddSpace] = useState(false);
  const [spaces, setSpaces] = useState<Space[]>([
    { id: 1, name: "Conference Room", department: "IT", floors: 1 },
    { id: 2, name: "IT Room 2", department: "HR", floors: 2 },
    { id: 3, name: "TISAX 5", department: "Sales", floors: 1 },
  ]);
  const [newSpace, setNewSpace] = useState<NewSpace>({
    name: "",
    department: "",
    floors: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddSpace = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      setSpaces(
        spaces.map((space) =>
          space.id === editingId
            ? { ...newSpace, id: editingId, floors: Number(newSpace.floors) }
            : space
        ) as Space[]
      );
      setEditingId(null);
    } else {
      setSpaces([
        ...spaces,
        { ...newSpace, id: Date.now(), floors: Number(newSpace.floors) },
      ] as Space[]);
    }
    setNewSpace({ name: "", department: "", floors: "" });
    setShowAddSpace(false);
  };

  const modifySpace = (id: number) => {
    const spaceToEdit = spaces.find((space) => space.id === id);
    if (spaceToEdit) {
      setNewSpace({
        ...spaceToEdit,
        floors: spaceToEdit.floors.toString(),
      });
    }
    setEditingId(id);
    setShowAddSpace(true);
  };

  const deleteSpace = (id: number) => {
    setSpaces(spaces.filter((space) => space.id !== id));
  };

  const filteredSpaces = spaces.filter((space) =>
    `${space.name} ${space.department} ${space.floors}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-[164px] bg-gradient-to-b from-green-500 to-blue-500 p-5 text-white flex flex-col">
        <div className="text-2xl font-bold text-center mb-6">AVL SPACE</div>
        <nav className="flex flex-col flex-grow space-y-4">
          <Link href="/RH/home" className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black p-2">
            <Home size={24} />
            <span>Home</span>
          </Link>
          <Link href="/RH/spaces" className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black p-2">
            <Map size={24} />
            <span>Spaces</span>
          </Link>
          <Link href="/RH/booking" className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black p-2">
            <Calendar size={24} />
            <span>Booking</span>
          </Link>
          <Link href="/RH/collaborators" className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black p-2">
            <FileUser size={24} />
            <span>Collaborators</span>
          </Link>
          <div className="flex-1"></div>
          <Link href="/RH/settings" className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black p-2 mt-auto">
            <Settings size={24} />
            <span>Settings</span>
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {/* Header */}
        <header className="w-full h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-900 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={180} height={38} />
          </div>
          <div className="flex items-center gap-6">
            <div className="bg-gradient-to-r from-[rgba(69,168,72,0.5)] to-[rgba(1,166,187,0.5)] p-3 rounded-xl text-sm font-semibold text-white">
              Human Resources
            </div>
            <button className="relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
            </button>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Abdelghani Bensalih</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Human Ressource</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700" />
          </div>
        </header>

        {/* Quick Stats */}
        <QuickStats />

        {/* Top Controls: Add + Search */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <button
            onClick={() => setShowAddSpace(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            + Add Space
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">Search</span>
            <Search className="w-4 h-4 text-gray-600" />
            <input
              type="text"
              placeholder="Search spaces..."
              className="border border-gray-300 rounded px-3 py-2 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Add Space Form */}
        {showAddSpace && (
          <div className="bg-white p-6 rounded shadow-lg w-80 absolute right-4 top-24 border border-blue-200 z-10">
            <form className="flex flex-col space-y-4" onSubmit={handleAddSpace}>
              <label className="font-bold">Space Name:</label>
              <input
                type="text"
                className="p-2 border rounded"
                value={newSpace.name}
                onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
                required
              />
              <label className="font-bold">Department:</label>
              <input
                type="text"
                className="p-2 border rounded"
                value={newSpace.department}
                onChange={(e) => setNewSpace({ ...newSpace, department: e.target.value })}
                required
              />
              <label className="font-bold">Floor:</label>
              <input
                type="number"
                className="p-2 border rounded"
                value={newSpace.floors}
                onChange={(e) => setNewSpace({ ...newSpace, floors: e.target.value })}
                required
                min="1"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editingId !== null ? "Modify Space" : "Add Space"}
              </button>
            </form>
          </div>
        )}

        {/* Grid of Spaces */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSpaces.map((space) => (
            <div key={space.id} className="bg-white p-4 rounded shadow border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800">{space.name}</h3>
              <p className="text-gray-600">Department: {space.department}</p>
              <p className="text-gray-600">Floors: {space.floors} floor(s)</p>
              <div className="flex justify-between mt-4">
                <button
                  className="text-purple-600 px-3 py-1 bg-gray-100 rounded hover:bg-purple-100"
                  onClick={() => modifySpace(space.id)}
                >
                  Modify
                </button>
                <button
                  className="text-red-600 px-3 py-1 bg-gray-100 rounded hover:bg-red-100"
                  onClick={() => deleteSpace(space.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
