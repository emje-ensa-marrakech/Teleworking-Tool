"use client";
import { useState } from "react";

export default function AVLSpace() {
  const [spaces, setSpaces] = useState([
    { id: 1, name: "Conference Room", department: "IT", floors: 1, status: true },
    { id: 2, name: "IT Room 2", department: "HR", floors: 2, status: true },
    { id: 3, name: "TISAX 5", department: "Sales", floors: 1, status: true },
    { id: 4, name: "Meeting Room", department: "IT", floors: 1, status: true },
    { id: 5, name: "IT Room 1", department: "HR", floors: 2, status: false },
    { id: 6, name: "TISAX 3", department: "Sales", floors: 1, status: true },
    { id: 7, name: "Conference Room", department: "IT", floors: 1, status: false },
    { id: 8, name: "IT Room 2", department: "HR", floors: 2, status: true },
    { id: 9, name: "TISAX 5", department: "Sales", floors: 1, status: false },
  ]);

  const [selectedSpace, setSelectedSpace] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleReserve = (space) => {
    if (space.status) {
      setSelectedSpace(space);
    } else {
      alert("This space is currently unavailable.");
    }
  };

  const confirmReservation = () => {
    if (selectedDate) {
      setConfirmationMessage(
        `You have requested to reserve "${selectedSpace.name}" on ${selectedDate}. Please wait for confirmation.`
      );
      setSelectedSpace(null);
      setSelectedDate("");
    } else {
      alert("Please select a date.");
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Spaces Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-green-700 text-white px-4 py-2 rounded">Human Resources</button>
          <div className="flex items-center space-x-2">
            <span>Marwa Rsaim</span>
            <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </header>

      {confirmationMessage && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
          {confirmationMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {spaces.map((space) => (
          <div key={space.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">{space.name}</h3>
            <p>Department: {space.department}</p>
            <p>Floors: {space.floors}</p>
            <p>Status: {space.status ? "Available" : "Unavailable"}</p>
            <div className="flex justify-between mt-4">
              {space.status && (
                <button
                  onClick={() => handleReserve(space)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Reserve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Reservation Modal */}
      {selectedSpace && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow w-80">
            <h2 className="text-xl font-bold mb-4">Reserve {selectedSpace.name}</h2>
            <label className="block mb-2">Choose a date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={confirmReservation}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => setSelectedSpace(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
