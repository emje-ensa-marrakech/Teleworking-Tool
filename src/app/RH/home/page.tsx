"use client";

import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface ChartData {
  name: string;
  value: number;
}

type SpaceOccupancyData = ChartData;
type ReservationPerMonthData = ChartData;
type ReservationPerServiceData = ChartData;

const attendanceData: ChartData[] = [
  { name: "Present", value: 36.2 },
  { name: "Missed Attendance", value: 63.8 },
];

const colors = ["#38a3a5", "#02c39a", "#4AA659", "#1e5c28", "#FF5733"];

export default function Dashboard() {
  const [spaceOccupancyRate, setSpaceOccupancyRate] = useState<SpaceOccupancyData[]>([]);
  const [reservationPerMonth, setReservationPerMonth] = useState<ReservationPerMonthData[]>([]);
  const [reservationPerService, setReservationPerService] = useState<ReservationPerServiceData[]>([]);
  const [isClient, setIsClient] = useState(false);

  const dashboardRef = useRef<HTMLDivElement>(null);

  const totalReservations = reservationPerService.reduce((acc, item) => acc + item.value, 0);

  const totalReservationsPerMonth = reservationPerMonth.reduce((acc, item) => acc + item.value, 0); 

  useEffect(() => {
    setIsClient(true);

    fetch("/api/TLorTLS/reservation-rate-by-service")
      .then((res) => res.json())
      .then((data) => setReservationPerService(data))
      .catch((err) => console.error("Error fetching reservation rate by service:", err));

    fetch("/api/TLorTLS/reservation-per-month")
      .then((res) => res.json())
      .then((data) => setReservationPerMonth(data))
      .catch((err) => console.error("Error fetching reservation per month:", err));

    fetch("/api/TLorTLS/space-occupancy-rate")
      .then((res) => res.json())
      .then((data) => setSpaceOccupancyRate(data))
      .catch((err) => console.error("Error fetching space occupancy rate:", err));
  }, []);

  const handleExportPDF = async () => {
    if (!dashboardRef.current) return;

    const canvas = await html2canvas(dashboardRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("dashboard-report.pdf");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen" ref={dashboardRef}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Workforce Overview</h1>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button
            onClick={handleExportPDF}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Export Report
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card title="Today Attendance Rate" value="36.2%" />
        <Card title="Total Reservations per Month" value={totalReservationsPerMonth.toString()} />
        <Card title="Booked Spaces" value={totalReservations.toString()} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Attendance Tracking */}
        <ChartContainer title="Attendance Tracking">
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
                {attendanceData.map((_, index) => (
                  <Cell key={index} fill={index === 0 ? "#4CAF50" : "#01A6BB"} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </ChartContainer>

        {/* Reservation per Month */}
        <ChartContainer title="Reservation per Month">
          {isClient && (
            <BarChart width={500} height={300} data={reservationPerMonth}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4CAF50" />
            </BarChart>
          )}
        </ChartContainer>

        {/* Reservation Rate by Service */}
        <ChartContainer title="Reservation Rate by Service">
          {isClient && (
            <PieChart width={310} height={300}>
              <Pie
                data={reservationPerService}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                label={({ value }) => `${Math.round((value / totalReservations) * 100)}%`}
              >
                {reservationPerService.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </ChartContainer>

        {/* Space Occupancy Rate */}
        <ChartContainer title="Space Occupancy Rate">
          {isClient && (
            <BarChart width={500} height={300} data={spaceOccupancyRate}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4CAF50" />
            </BarChart>
          )}
        </ChartContainer>
      </div>
    </div>
  );
}

/* Helper Components */
function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
      <h4 className="text-gray-500 text-lg">{title}</h4>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}

function ChartContainer({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h4 className="text-gray-500 mb-2">{title}</h4>
      <hr className="border-gray-300 mb-4" />
      {children}
    </div>
  );
}
