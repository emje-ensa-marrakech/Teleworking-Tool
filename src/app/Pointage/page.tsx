"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FiltersState {
  date: string | null;
  department: string;
  status: string;
}

const Filters: React.FC<{ onFilterChange: (filters: FiltersState) => void }> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FiltersState>({
    date: null,
    department: "all",
    status: "all",
  });

  const formatDate = (date: Date | null): string | null => {
    if (!date) return null;
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateChange = (date: Date | null) => {
    const newFilters = { ...filters, date: formatDate(date) };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = { date: null, department: "all", status: "all" };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <section className="flex gap-4 justify-center mt-10">
      <DatePicker
        selected={filters.date ? new Date(filters.date) : null}
        onChange={handleDateChange}
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
      <select
        name="status"
        value={filters.status}
        onChange={handleFilterChange}
        className="p-2 border rounded"
      >
        <option value="all">Select Status</option>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>
      <button onClick={resetFilters} className="bg-red-500 text-white px-4 py-2 rounded">
        Reset Filter
      </button>
    </section>
  );
};

const AVLSpace: React.FC = () => {
  const [filters, setFilters] = useState<FiltersState>({
    date: null,
    department: "all",
    status: "all",
  });

  const handleFilterChange = (newFilters: FiltersState) => {
    setFilters(newFilters);
  };

  const data = [
    { id: "U30G25", name: "Christine Brooks", space: "TISAX 5", date: "14 Feb 2019", dept: "IT", status: "Present" },
    { id: "U42B18", name: "John Smith", space: "Tisax 4", date: "25 Mar 2020", dept: "HR", status: "Absent" }
  ];

  // Apply filters
  const filteredData = data.filter((row) => {
    const matchesDate = filters.date ? row.date === filters.date : true;
    const matchesDept = filters.department === "all" || row.dept === filters.department;
    const matchesStatus = filters.status === "all" || row.status === filters.status;

    return matchesDate && matchesDept && matchesStatus;
  });

  return (
    <div className="flex w-full bg-gray-100">
      <aside className="w-40 min-h-screen bg-gradient-to-b from-green-500 to-blue-500 p-5 text-white">
        <img src="/avl.png" alt="AVL Logo" className="w-40 mx-auto mb-5" />
        <nav>
          <ul className="space-y-5">
            {["Home", "Spaces", "Booking", "Collaborators", "Settings"].map((item) => (
              <li key={item}>
                <a href="#" className="block py-2 px-4 rounded hover:bg-white hover:text-black">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-5">
        <Filters onFilterChange={handleFilterChange} />
        <section className="w-full flex justify-center mt-10">
          <div className="w-full max-w-none rounded-lg border border-gray-300 bg-white p-6 shadow-md">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {["ID", "NAME", "Reserved space", "DATE", "Department", "STATUS"].map((head) => (
                    <th key={head} className="p-4 border-b text-center text-lg">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map(({ id, name, space, date, dept, status }) => (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className="p-4 border-b text-center text-base">{id}</td>
                    <td className="p-4 border-b text-center text-base">{name}</td>
                    <td className="p-4 border-b text-center text-base">{space}</td>
                    <td className="p-4 border-b text-center text-base">{date}</td>
                    <td className="p-4 border-b text-center text-base">{dept}</td>
                    <td className="p-4 border-b text-center">
                      <span className={`px-4 py-2 rounded-lg ${status === "Present" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>{status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AVLSpace;
