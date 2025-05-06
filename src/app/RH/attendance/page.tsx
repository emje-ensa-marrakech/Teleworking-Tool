"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaFilter, FaCalendarAlt } from "react-icons/fa";
import { Home, Calendar, Settings, Bell, Map, FileUser } from "lucide-react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AttendanceItem {
  id: number;
  name: string;
  space: string;
  date: string;
  department: string;
  status: string;
}

const departments = ["IT", "HR", "Marketing"];
const spaces = ["Room A", "Room B", "Open Space"];

export default function Dashboard() {
  const [userName] = useState("Abdelghani Bensalih");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);
  const [spaceFilter, setSpaceFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [attendanceItems, setAttendanceItems] = useState<AttendanceItem[]>([]);

  // Generate sample data
  useEffect(() => {
    const sampleData: AttendanceItem[] = [
      { id: 1, name: "John Doe", space: "Room A", date: "2023-02-14", department: "IT", status: "Present" },
      { id: 2, name: "Jane Smith", space: "Room B", date: "2023-02-15", department: "HR", status: "Absent" },
      { id: 3, name: "Mike Johnson", space: "Open Space", date: "2023-02-14", department: "Marketing", status: "Present" },
      { id: 4, name: "Sarah Williams", space: "Room A", date: "2023-02-16", department: "IT", status: "Absent" },
      { id: 5, name: "David Brown", space: "Room B", date: "2023-02-15", department: "HR", status: "Present" },
    ];
    setAttendanceItems(sampleData);
  }, []);

  const filteredData = attendanceItems.filter((item) => {
    const itemDate = new Date(item.date);
    const matchesDate = !dateFilter || 
      itemDate.toDateString() === dateFilter.toDateString();
    const matchesDept = !departmentFilter || item.department === departmentFilter;
    const matchesSpace = !spaceFilter || item.space === spaceFilter;
    
    return matchesDate && matchesDept && matchesSpace;
  });

  function resetFilters() {
    setDateFilter(null);
    setDepartmentFilter(null);
    setSpaceFilter(null);
  }

  function changeDate(days: number) {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + days);
    setCurrentDate(newDate);
  }

  function formatDisplayDate(date: Date | null) {
    if (!date) return "Select date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar (unchanged) */}
      <aside className="w-full md:w-[164px] bg-gradient-to-b from-green-500 to-blue-500 p-5 text-white flex flex-col">
        <Image
          width={100}
          height={100}
          src="/avl.png"
          alt="User"
          className="w-28 h-14 rounded-lg mb-16"
        />
        <nav className="flex flex-col flex-grow space-y-4">
          <Link href="/RH/home" className="flex flex-col items-center hover:bg-white hover:text-black p-2 rounded-lg">
            <Home size="24" />
            <span>Home</span>
          </Link>
          <Link href="/RH/spaces" className="flex flex-col items-center hover:bg-white hover:text-black p-2 rounded-lg">
            <Map size="24" />
            <span>Spaces</span>
          </Link>
          <Link href="/RH/booking" className="flex flex-col items-center hover:bg-white hover:text-black p-2 rounded-lg">
            <Calendar size="24" />
            <span>Booking</span>
          </Link>
          <Link href="/RH/collaborators" className="flex flex-col items-center hover:bg-white hover:text-black p-2 rounded-lg">
            <FileUser size="24" />
            <span>Collaborators</span>
          </Link>
          <div className="flex-1"></div>
          <Link href="/RH/settings" className="flex flex-col items-center hover:bg-white hover:text-black p-2 mt-auto rounded-lg">
            <Settings size="24" />
            <span>Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex flex-col p-5 md:flex-row bg-white justify-between items-center mb-3 shadow-lg">
          <Image
            width={100}
            height={100}
            src="/logo.png"
            alt="User"
            className="w-20 h-25"
          />
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="bg-gradient-to-r from-[rgba(69,168,72,0.5)] to-[rgba(1,166,187,0.5)] font-bold text-black px-8 py-2 rounded-xl">
              Human Resources
            </div>
            <Bell className="text-gray-700" />
            <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span>{userName}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-600 text-lg" />
              <span className="text-sm font-medium text-gray-800">Filter By</span>
            </div>

            {/* Date Picker with Calendar */}
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 text-sm w-48">
                <FaCalendarAlt className="text-gray-400 mr-2" />
                <DatePicker
                  selected={dateFilter}
                  onChange={(date) => setDateFilter(date)}
                  dateFormat="dd MMM yyyy"
                  placeholderText="Select date"
                  className="w-full focus:outline-none bg-transparent"
                  showPopperArrow={false}
                />
              </div>
            </div>

            {/* Department Dropdown */}
            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              value={departmentFilter || ""}
              onChange={(e) => setDepartmentFilter(e.target.value || null)}
            >
              <option value="">Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            {/* Reserved Space Dropdown */}
            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              value={spaceFilter || ""}
              onChange={(e) => setSpaceFilter(e.target.value || null)}
            >
              <option value="">Reserved space</option>
              {spaces.map((space) => (
                <option key={space} value={space}>
                  {space}
                </option>
              ))}
            </select>

            <button
              onClick={resetFilters}
              className="ml-auto text-sm text-[#e11d48] hover:underline whitespace-nowrap"
            >
              ⟲ Reset Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reserved space</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4">{item.id}</td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.space}</td>
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4">{item.department}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${item.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Date Navigation */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <button
              onClick={() => changeDate(-1)}
              className="px-4 py-2 border border-gray-300 text-sm rounded-md"
            >
              Prev. Date
            </button>
            <span className="text-sm text-gray-700">
              {currentDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <button
              onClick={() => changeDate(1)}
              className="px-4 py-2 border border-gray-300 text-sm rounded-md"
            >
              Next Date
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}