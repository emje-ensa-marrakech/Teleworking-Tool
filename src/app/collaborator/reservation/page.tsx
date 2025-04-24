"use client";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReservationDashboard() {
  const [filters, setFilters] = useState({
    date: null,
    department: "all",
  });

  interface Workspace {
    id: string;
    name: string;
    departement: string;
    floor?: string;
    available: boolean;
  }

  const [availableSpaces, setAvailableSpaces] = useState<Workspace[]>([]);

  const formatDate = (date) => {
    if (!date) return null;
    return date.toISOString().split("T")[0]; // yyyy-mm-dd
  };

  const fetchAvailableSpaces = async () => {
    const query = new URLSearchParams({
      date: filters.date ? formatDate(filters.date) : new Date().toISOString().split("T")[0],
    });

    const res = await fetch(`/api/workspaces?${query}`);
    const data = await res.json();
    setAvailableSpaces(data);
  };

  useEffect(() => {
    fetchAvailableSpaces();
  }, [filters.date]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const resetFilters = () => {
    setFilters({ date: null, department: "all" });
  };

  const filteredSpaces = availableSpaces.filter((ws) => {
    return filters.department === "all" || ws.departement === filters.department;
  });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* sidebar omitted for brevity */}
      <main className="flex-1 p-6">
        <header className="flex justify-end items-center gap-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded">Reserve room</button>
          <span>Marwa Rsaim</span>
          <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
        </header>

        <section className="flex gap-4 justify-center mt-10">
          <DatePicker
            selected={filters.date}
            onChange={(date) => setFilters({ ...filters, date })}
            className="p-2 border rounded"
            placeholderText="Select a date"
          />

          <select
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="all">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>

          <button onClick={resetFilters} className="bg-red-500 text-white px-4 py-2 rounded">Reset Filter</button>
        </section>

        <section className="mt-6 bg-white p-6 rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Department</th>
                <th className="p-2 border">Floor</th>
                <th className="p-2 border">Available</th>
              </tr>
            </thead>
            <tbody>
              {filteredSpaces.map((ws) => (
                <tr key={ws.id} className="text-center border">
                  <td className="p-2 border">{ws.id}</td>
                  <td className="p-2 border">{ws.name}</td>
                  <td className="p-2 border">{ws.departement}</td>
                  <td className="p-2 border">{ws.floor ?? "-"}</td>
                  <td className="p-2 border">{ws.available}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
