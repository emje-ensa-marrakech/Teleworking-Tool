"use client";

import { SetStateAction, useState } from "react";
import { Home, Calendar, Settings, Bell, Map, FileUser } from "lucide-react";
import Link from "next/link";

export default function AVLSpace() {
  const [showAddSpace, setShowAddSpace] = useState(false);
  const [spaces, setSpaces] = useState([
    { id: 1, name: "Conference Room", department: "IT", floors: 1 },
    { id: 2, name: "IT Room 2", department: "HR", floors: 2 },
    { id: 3, name: "TISAX 5", department: "Sales", floors: 1 },
  ]);
  const [newSpace, setNewSpace] = useState({
    name: "",
    department: "",
    floors: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleAddSpace = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (editingId) {
      setSpaces(
        spaces.map((space) =>
          space.id === editingId
            ? { ...newSpace, id: editingId, floors: Number(newSpace.floors) }
            : space
        )
      );
      setEditingId(null);
    } else {
      setSpaces([
        ...spaces,
        { ...newSpace, id: Date.now(), floors: Number(newSpace.floors) },
      ]);
    }
    setNewSpace({ name: "", department: "", floors: "" });
    setShowAddSpace(false);
  };

  const modifySpace = (id: number | SetStateAction<null>) => {
    const spaceToEdit = spaces.find((space) => space.id === id);
    if (spaceToEdit) {
      setNewSpace({ ...spaceToEdit, floors: spaceToEdit.floors.toString() });
    }
    setEditingId(id);
    setShowAddSpace(true);
  };

  const deleteSpace = (id) => {
    setSpaces(spaces.filter((space) => space.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-full md:w-[164px] bg-gradient-to-b from-green-500 to-blue-500 p-5 text-white flex flex-col">
        <div className="text-2xl font-bold text-center mb-6">AVL SPACE</div>
        <nav className="flex flex-col flex-grow space-y-4">
          <Link
            href="/RH/home"
            className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black"
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
            href="/RH/collaborators"
            className="flex flex-col items-center space-y-2 rounded-lg cursor-pointer hover:bg-white hover:text-black"
          >
            <FileUser size="48" />
            <div>Collaborators</div>
          </Link>

          <div className="flex-1"></div>
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

      <main className="flex-1 p-6">
        <header className="flex justify-end items-center space-x-4 p-4">
          <button className="bg-green-700 text-white px-4 py-2 rounded">
            Human Resources
          </button>
          <div className="flex items-center space-x-2">
            <span>Marwa Rsaim</span>
            <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
          </div>
        </header>

        <section className="bg-gray-200 p-4 rounded flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Quick Stats</h3>
          <button
            onClick={() => setShowAddSpace(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Space
          </button>
        </section>

        {showAddSpace && (
          <div className="bg-teal-100 p-6 rounded shadow-lg w-80 absolute right-4 top-20">
            <form className="flex flex-col space-y-4" onSubmit={handleAddSpace}>
              <label className="font-bold">Space Name:</label>
              <input
                type="text"
                className="p-2 border rounded"
                value={newSpace.name}
                onChange={(e) =>
                  setNewSpace({ ...newSpace, name: e.target.value })
                }
              />

              <label className="font-bold">Department:</label>
              <input
                type="text"
                className="p-2 border rounded"
                value={newSpace.department}
                onChange={(e) =>
                  setNewSpace({ ...newSpace, department: e.target.value })
                }
              />

              <label className="font-bold">Floor:</label>
              <input
                type="number"
                className="p-2 border rounded"
                value={newSpace.floors}
                onChange={(e) =>
                  setNewSpace({ ...newSpace, floors: e.target.value })
                }
              />

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editingId ? "Modify Space" : "Add Space"}
              </button>
            </form>
          </div>
        )}

        <section className="grid grid-cols-3 gap-4">
          {spaces.map((space) => (
            <div key={space.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold">{space.name}</h3>
              <p>Department: {space.department}</p>
              <p>Floors: {space.floors} floor(s)</p>
              <div className="flex justify-between mt-4">
                <button
                  className="text-purple-600 p-2 bg-gray-100"
                  onClick={() => modifySpace(space.id)}
                >
                  Modify
                </button>
                <button
                  className="text-red-600 p-2 bg-gray-100"
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
