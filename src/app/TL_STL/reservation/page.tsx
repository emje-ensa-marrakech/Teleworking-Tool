"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReservationDashboard() {
  const [filters, setFilters] = useState({
    date: null,
    department: "all",
    status: "all",
  });

  const reservations = [
    { id: "00001", space: "TISAX 5", date: "14 Feb 2019", department: "IT", status: "Reserved" },
    { id: "00002", space: "IT Room 2", date: "14 Feb 2019", department: "IT", status: "Processing" },
    { id: "00003", space: "HR Room 5", date: "14 Feb 2019", department: "HR", status: "Rejected" },
    { id: "00004", space: "Conference Room", date: "14 Feb 2019", department: "HR", status: "Reserved" },
    { id: "00005", space: "TISAX 3", date: "15 Feb 2019", department: "IT", status: "Processing" },
    { id: "00006", space: "Finance Room 6", date: "15 Feb 2019", department: "Finance", status: "Reserved" },
  ];

  // Format the selected date to match the date format in reservations (e.g., "14 Feb 2019")
  const formatDate = (date) => {
    if (!date) return null;
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const resetFilters = () => {
    setFilters({ date: null, department: "all", status: "all" });
  };

  const filteredReservations = reservations.filter((res) => {
    return (
      (filters.date === null || res.date === filters.date) &&
      (filters.department === "all" || res.department === filters.department) &&
      (filters.status === "all" || res.status === filters.status)
    );
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-56 bg-gradient-to-b from-green-600 to-blue-600 text-white p-5 flex flex-col">
        <div className="text-xl font-bold text-center mb-6">AVL SPACE</div>
        <nav className="space-y-2">
          <a href="#" className="flex items-center gap-2 p-2 bg-white bg-opacity-20 rounded">
            <i className="fas fa-home"></i> Home
          </a>
          <a href="#" className="flex items-center gap-2 p-2">
            <i className="fas fa-map"></i> Map
          </a>
          <a href="#" className="flex items-center gap-2 p-2">
            <i className="fas fa-history"></i> History
          </a>
          <a href="#" className="flex items-center gap-2 p-2">
            <i className="fas fa-cog"></i> Settings
          </a>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <header className="flex justify-end items-center gap-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded">Reserve room</button>
          <span>Marwa Rsaim</span>
          <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
        </header>

        <section className="flex gap-4 justify-center mt-10">
          <label htmlFor="date" className="hidden">Filter by date</label>
          <DatePicker
            selected={filters.date ? new Date(filters.date) : null}
            onChange={(date) => setFilters({ ...filters, date: formatDate(date) })}
            className="p-2 border rounded"
            placeholderText="Select a date"
          />

          <label htmlFor="department" className="hidden">Filter by department</label>
          <select
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            className="p-2 border rounded"
            id="department"
          >
            <option value="all">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>

          <label htmlFor="status" className="hidden">Filter by status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="p-2 border rounded"
            id="status"
          >
            <option value="all">All Statuses</option>
            <option value="Reserved">Reserved</option>
            <option value="Processing">Processing</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button onClick={resetFilters} className="bg-red-500 text-white px-4 py-2 rounded">Reset Filter</button>
        </section>

        <section className="mt-6 bg-white p-6 rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Reserved space</th>
                <th className="p-2 border">DATE</th>
                <th className="p-2 border">Department</th>
                <th className="p-2 border">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((res) => (
                <tr key={res.id} className="text-center border">
                  <td className="p-2 border">{res.id}</td>
                  <td className="p-2 border">{res.space}</td>
                  <td className="p-2 border">{res.date}</td>
                  <td className="p-2 border">{res.department}</td>
                  <td className={`p-2 border font-bold ${res.status === "Reserved" ? "text-green-700 bg-green-100" : res.status === "Processing" ? "text-purple-700 bg-purple-100" : "text-red-700 bg-red-100"}`}>
                    {res.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
