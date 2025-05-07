"use client";
import { use, useEffect, useState } from "react";
import { Bell, Calendar as CalendarIcon } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type Space = {
  id: number;
  name: string;
  departement: string;
  floor: number;
  status: boolean;
};

export default function AVLSpace() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("");
  const [floorFilter, setFloorFilter] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
      const storedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
      const storedUserId = localStorage.getItem("id") || sessionStorage.getItem("id");
      setToken(storedToken);
      setUserId(storedUserId);
    }, []);

     useEffect(() => {
        if (token) {
          fetchSpaces();
        }
      }, [token]);
  
  
const  fetchSpaces = async () => {
      try {
        const response = await fetch("/api/collab/fetchSpaces",{
          headers: {
             Authorization: token!,
            "Content-Type": "application/json",
          },
        }
        ); // <-- Your GET endpoint
        const data = await response.json();
        setSpaces(data.spaces || []);
        console.log("Fetched spaces:", data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch spaces:", error);
      }
    }
  

  // Get unique departments and floors for filter options
  const departments = [...new Set(spaces.map(space => space.departement))];
  const floors = [...new Set(spaces.map(space => space.floor))].sort();

  // Filter spaces based on selected filters
  const filteredSpaces = spaces.filter(space => {
    const matchesDepartment = departmentFilter === "" || space.departement === departmentFilter;
    const matchesFloor = floorFilter === null || space.floor === floorFilter;
    return matchesDepartment && matchesFloor;
  });

  const handleReserve = (space: Space) => {
    if (space.status) {
      setSelectedSpace(space);
      setShowCalendar(true);
    } else {
      alert("This space is currently unavailable.");
    }
  };

  const confirmReservation = async () => {
    if (date && selectedSpace) {
      try {
        

        const reservationData = {
          userId,
          spaceId: selectedSpace.id,
          reservationDate: date.toISOString().split("T")[0], // e.g., 2024-05-07
        };

        const response = await fetch("/api/collab/makeReservation", { // <-- Your POST endpoint
          method: "POST",
          headers: {
            Authorization: token!,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
          
        });

        if (!response.ok) {
          throw new Error("Failed to submit reservation");
        }

        setConfirmationMessage(
          `Your reservation request for "${selectedSpace.name}" on ${format(date, "PPP", { locale: fr })} has been submitted. Please wait for HR department confirmation.`
        );
        setSelectedSpace(null);
        setDate(null);
        setShowCalendar(false);
      } catch (error) {
        console.error(error);
        alert("Failed to reserve the space. Please try another date.");
      }
    } else {
      alert("Please select a date.");
    }
  };

  const resetFilters = () => {
    setDepartmentFilter("");
    setFloorFilter(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex-1 bg-gray-100 min-h-screen">
      

      <div className="p-6">
        {confirmationMessage && (
          <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
            {confirmationMessage}
          </div>
        )}

        <h1 className="text-2xl font-semibold mb-4">Spaces Dashboard</h1>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-gray-600 font-medium mb-3">Filter By</h3>
          
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-sm text-gray-500 mb-1">Department</label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div className="flex-1 w-full">
              <label className="block text-sm text-gray-500 mb-1">Floor</label>
              <select
                value={floorFilter || ""}
                onChange={(e) => setFloorFilter(e.target.value ? Number(e.target.value) : null)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Floors</option>
                {spaces.map(space => (
                  <option key={space.id} value={space.floor}>Floor {space.floor}</option>
                ))}
              </select>
            </div>
            
            <div className="flex-1 w-full md:w-auto">
              <button
                onClick={resetFilters}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm py-2 px-4 w-full md:w-auto"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>

        {/* Filter indicators */}
        {(departmentFilter || floorFilter !== null) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {departmentFilter && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Department: {departmentFilter}
              </span>
            )}
            {floorFilter !== null && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Floor: {floorFilter}
              </span>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSpaces.map((space) => (
            <div key={space.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold">{space.name}</h3>
              <p className="text-gray-600">Department: {space.departement}</p>
              <p className="text-gray-600">Floor: {space.floor}</p>
              <p className="mb-3">
                Status: 
                <span className={`ml-2 font-semibold ${space.status ? 'text-green-600' : 'text-red-600'}`}>
                  {space.status ? "Available" : "Unavailable"}
                </span>
              </p>
              <div className="flex justify-between mt-4">
                {space.status && (
                  <button
                    onClick={() => handleReserve(space)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    Reserve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Reservation Modal with Calendar */}
        {selectedSpace && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-xl font-bold mb-4">Reserve {selectedSpace.name}</h2>
              
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Select a date:</label>
                <div className="relative">
                  <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="flex items-center w-full p-2 border border-gray-300 rounded-md text-left hover:bg-gray-50"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: fr }) : "Select a date"}
                  </button>
                  {showCalendar && (
                    <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg w-full">
                      <div className="p-2">
                        <input
                          type="date"
                          value={date ? format(date, "yyyy-MM-dd") : ""}
                          onChange={(e) => {
                            setDate(e.target.value ? new Date(e.target.value) : null);
                            setShowCalendar(false);
                          }}
                          className="w-full p-2 border rounded"
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setSelectedSpace(null);
                    setDate(null);
                    setShowCalendar(false);
                  }}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReservation}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
