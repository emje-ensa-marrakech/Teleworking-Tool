"use client";
import 'tailwindcss/tailwind.css';
import { useState } from "react";
import { FaHome, FaBuilding, FaBook, FaUsers, FaCog } from "react-icons/fa";

export default function AVLSpace() {
  const [showAddSpace, setShowAddSpace] = useState(false);
  const [spaces, setSpaces] = useState([
    { id: 1, name: "Conference Room", department: "IT", floors: 1 },
    { id: 2, name: "IT Room 2", department: "HR", floors: 2 },
    { id: 3, name: "TISAX 5", department: "Sales", floors: 1 },
    { id: 4, name: "Meeting Room", department: "IT", floors: 1 },
    { id: 5, name: "IT Room 1", department: "HR", floors: 2 },
    { id: 6, name: "TISAX 3", department: "Sales", floors: 1 },
    { id: 7, name: "Conference Room", department: "IT", floors: 1 },
    { id: 8, name: "IT Room 2", department: "HR", floors: 2 },
    { id: 9, name: "TISAX 5", department: "Sales", floors: 1 },
  ]);
  const [selectedSpace, setSelectedSpace] = useState(null);

  // Handle adding a new space
  const handleAddSpace = (newSpace) => {
    setSpaces([...spaces, newSpace]);
    setShowAddSpace(false); // Hide the form after adding
  };

  // Handle modifying a space
  const handleModifySpace = (space) => {
    setSelectedSpace(space);
    setShowAddSpace(true); // Show form to modify
  };

  // Handle deleting a space
  const handleDeleteSpace = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this space?");
    if (confirmDelete) {
      setSpaces(spaces.filter(space => space.id !== id)); // Remove space from list
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-green-700 to-blue-600 text-white p-6 flex flex-col">
        <div className="text-2xl font-bold text-center mb-6">AVL SPACE</div>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-3 p-3 rounded bg-white/20">
            <FaHome /> Home
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded hover:bg-white/20">
            <FaBuilding /> Spaces
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded hover:bg-white/20">
            <FaBook /> Booking
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded hover:bg-white/20">
            <FaUsers /> Collaborators
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded hover:bg-white/20">
            <FaCog /> Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-end items-center space-x-4 p-4">
          <button className="bg-green-700 text-white px-4 py-2 rounded">Human Resources</button>
          <div className="flex items-center space-x-2">
            <span>Marwa Rsaim</span>
            <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
          </div>
        </header>

        {/* Quick Stats */}
        <section className="bg-gray-200 p-4 rounded flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Quick Stats</h3>
          <button onClick={() => setShowAddSpace(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Add Space
          </button>
        </section>

        {/* Add Space Form */}
        {showAddSpace && selectedSpace === null && (
          <div className="bg-teal-100 p-6 rounded shadow-lg w-80 absolute right-4 top-20">
            <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
              <label className="font-bold">Space Name:</label>
              <input type="text" className="p-2 border rounded" />

              <label className="font-bold">Department:</label>
              <input type="text" className="p-2 border rounded" />

              <label className="font-bold">Floor:</label>
              <input type="number" className="p-2 border rounded" />

              <button 
                onClick={() => {
                  const newSpace = {
                    id: Date.now(),
                    name: 'New Space Name', // Replace with form values
                    department: 'New Dept', // Replace with form values
                    floors: 2, // Replace with form values
                  };
                  handleAddSpace(newSpace);
                }} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add Space
              </button>
            </form>
          </div>
        )}

        {/* Modify Space Form */}
        {showAddSpace && selectedSpace !== null && (
          <div className="bg-teal-100 p-6 rounded shadow-lg w-80 absolute right-4 top-20">
            <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
              <label className="font-bold">Space Name:</label>
              <input 
                type="text" 
                className="p-2 border rounded" 
                defaultValue={selectedSpace.name} 
              />

              <label className="font-bold">Department:</label>
              <input 
                type="text" 
                className="p-2 border rounded" 
                defaultValue={selectedSpace.department} 
              />

              <label className="font-bold">Floor:</label>
              <input 
                type="number" 
                className="p-2 border rounded" 
                defaultValue={selectedSpace.floors} 
              />

              <button 
                onClick={() => {
                  const updatedSpace = {
                    id: selectedSpace.id,
                    name: 'Updated Name', // Replace with form values
                    department: 'Updated Dept', // Replace with form values
                    floors: 3, // Replace with form values
                  };
                  setSpaces(spaces.map(space => space.id === selectedSpace.id ? updatedSpace : space));
                  setShowAddSpace(false); // Close form after modifying
                  setSelectedSpace(null); // Reset selected space
                }} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Modify Space
              </button>
            </form>
          </div>
        )}

        {/* Spaces List */}
        <section className="grid grid-cols-3 gap-4">
          {spaces.map((space) => (
            <div key={space.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold">{space.name}</h3>
              <p>Department: {space.department}</p>
              <p>Floors: {space.floors} floor(s)</p>
              <div className="flex justify-between mt-4">
                <button 
                  onClick={() => handleModifySpace(space)} 
                  className="text-purple-600 p-2 bg-gray-100">
                  Modify
                </button>
                <button 
                  onClick={() => handleDeleteSpace(space.id)} 
                  className="text-red-600 p-2 bg-gray-100">
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