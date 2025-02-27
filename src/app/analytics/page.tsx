"use client";
import { useState, useEffect, use } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { Home, Calendar, Settings, Bell, DivideIcon } from "lucide-react";

const attendanceData = [
  { name: "Present", value: 36.2 },
  { name: "Missed Attendance", value: 63.8 },
];

const reservationData = [
  { name: "Finance Service", value: 30.3 },
  { name: "IT Service", value: 13.1 },
  { name: "Sales Service", value: 28.6 },
  { name: "Quality Service", value: 28 },
];

const spaceOccupancyData = [
  { name: "Conference Room", value: 100 },
  { name: "TISAX 1", value: 50 },
  { name: "IT Room 2", value: 70 },
  { name: "Sales Room 4", value: 20 },
  { name: "TISAX 5", value: 30 },
];

export default function Dashboard() {
  const [userName, setUserName] = useState("Abdelghani Bensalih");
  const [isClient, setIsClient] = useState(false);

  const [spaceOccupancyRate, setSpaceOccupancyRate] = useState([]);
  const [reservationPerMonth, setReservationPerMonth] = useState([]);
  const [reservationPerService, setReservationPerService] = useState<{ name: string; value: number }[]>([]);
  const colors = ["#38a3a5", "#02c39a", "#4AA659", "#1e5c28", "#FF5733"];

  const totalReservations = reservationPerService.reduce(
    (acc, item) => acc + item.value,
    0
  );

  useEffect(() => {
    fetch("/api/TLorTLS/reservation-rate-by-service")
      .then((res) => res.json())
      .then((reservationPerService) => {
        setReservationPerService(reservationPerService);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);


  useEffect(() => {
    fetch("/api/TLorTLS/reservation-per-month")
      .then((res) => res.json())
      .then((reservationPerMonth) => {
        setReservationPerMonth(reservationPerMonth);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    fetch("/api/TLorTLS/space-occupancy-rate")
      .then((res) => res.json())
      .then((spaceOccupancyRate) => {
        setSpaceOccupancyRate(spaceOccupancyRate);
        console.log(spaceOccupancyRate);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);
  


  

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-[164px] bg-gradient-to-b from-green-500 to-blue-500 p-5 text-white flex flex-col">
        <img src="avl.png" alt="User" className="w-28 h-14 rounded-lg" />
        <nav className="flex flex-col flex-grow space-y-4">
          <Home className="mt-10 " size="48" />
          <div className="flex items-center space-x-3  rounded-lg cursor-pointer hover:bg-white hover:text-black">
            <div>Home</div>
          </div>
          <Calendar size="48" />
          <div className="flex items-center space-x-3  rounded-lg cursor-pointer hover:bg-white hover:text-black">
            <span>Reservations</span>
          </div>
          <div className="flex-1"></div>
          <Settings size="48" />
          <div className="flex items-center space-x-3  rounded-lg cursor-pointer hover:bg-white hover:text-black mt-auto">
            <span>Settings</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex flex-col p-5 md:flex-row bg-white justify-between items-center mb-3 shadow-lg">
          <img src="logo.png" alt="User" className="w-20 h-25 rounded-2" />
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="bg-gradient-to-r from-[rgba(69,168,72,0.5)] to-[rgba(1,166,187,0.5)] font-bold text-black px-8 py-2 rounded-xl">
              TL / STL
            </div>
            <Bell className="text-gray-700 " />

            <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span>{userName}</span>
          </div>
        </div>

        {/* Page Title */}
        <h3 className="text-2xl m-2 font-semibold">Welcome {userName} 👋</h3>
        {/* Welcome Message */}
        <div className="flex flex-col md:flex-row justify-between items-center mx-4 mb-5">
          <div>
            <p className="text-xl font-semibold">
              Here is an overview of your workforce today
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0 flex-grow justify-center md:justify-end">
            <label htmlFor="period-select" className="mr-2 font-extrabold">
              Select period
            </label>
            <select
              id="period-select"
              className="border border-gray-300 px-4 py-2 rounded-lg"
            >
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last Week</option>
              <option>Last Month</option>
            </select>
            {/* Export Charts */}
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-10">
            Export report
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid mx-6 grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-gray-500">Today's Attendance Rate</h4>
            <p className="text-2xl font-bold">36.2%</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-gray-500">Number of New Hires</h4>
            <p className="text-2xl font-bold">36</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-gray-500">Number of Booked Spaces</h4>
            <p className="text-2xl font-bold">{totalReservations}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid mx-6 grid-cols-1 xl:grid-cols-2 gap-3 mt-3">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-gray-500">Attendance Tracking</h4>
            <hr className="w-1/2 border-gray-400" />
            {isClient && (
              <PieChart width={300} height={300}>
                <Pie
                  data={attendanceData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  label={({ value }) => `${value}%`}
                >
                  {attendanceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#4CAF50" : "#01A6BB"}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend align="left" />
              </PieChart>
            )}
          </div>

          <div className="bg-white p-2 rounded-lg shadow">
            <h4 className="text-gray-500">Reservation per Month</h4>

            {isClient && (
              <BarChart
                width={500}
                height={300}
                data={reservationPerMonth}
                barGap={20}
              >
                <XAxis dataKey="name" interval={0} tick={{ fontSize: 13 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4CAF50" />
              </BarChart>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-gray-500">Reservation Rate by Service</h4>
            <hr className="w-1/2 border-gray-400" />
            {isClient && (
              <PieChart width={310} height={300}>
                <Pie
                  data={reservationPerService}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  label={({ value }) => `${(value/totalReservations)*100}%`}
                >
                  {reservationPerService.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend align="left" />
              </PieChart>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-gray-500">Space Occupancy Rate</h4>
            {isClient && (
              <BarChart
                width={500}
                height={300}
                data={spaceOccupancyRate}
                barCategoryGap={10}
              >
                <XAxis
                  dataKey="name"
                  interval={0}
                  tick={{ textAnchor: "middle", fontSize: 13 }}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4CAF50" />
              </BarChart>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
