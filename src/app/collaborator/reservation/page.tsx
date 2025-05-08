"use client";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReservationDashboard() {
  const [filters, setFilters] = useState<{
    date: Date | null;
    department: string;
  }>({
    date: null,
    department: "all",
  });

  interface Workspace {
    id: string;
    workspaceName: string;
    departement: string;
    floor?: string;
    confirmed: boolean;
    time: Date;
  }

  const [availableSpaces, setAvailableSpaces] = useState<Workspace[]>([]);
  const [toShow,setShow] = useState<Workspace[]>([])

  const formatDate = (date: Date | null) => {
    if (!date) return null;
    return date.toISOString().split("T")[0]; // yyyy-mm-dd
  };

  const fetchAvailableSpaces = async () => {
    const query = new URLSearchParams({
      id :  (localStorage.getItem("id") || sessionStorage.getItem("id"))!,
    });

    const res = await fetch(`/api/collab/history?${query}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': (localStorage.getItem("token") || sessionStorage.getItem("token"))!
      }
    });
    const data = await res.json();
    console.log(data);
    setAvailableSpaces(data);
  };

  useEffect(() => {
    fetchAvailableSpaces();
  }, []);

  useEffect(
    ()=>{
  
      const filtred : Workspace[] = availableSpaces.filter(
        (e)=>{
          if (filters.department == "all" && filters.date){
            console.log(new Date(e.time) ==  filters.date );
            
            return new Date(e.time) ==  filters.date       }   
          if (filters.department != "all" && !filters.date)
            return e.departement == filters.department   
          if (filters.department != "all" && filters.date)
            return e.departement == filters.department || e.time ==  filters.date 
          if  (filters.department != "all" && filters.date) 
            return true       
        }

      )
      setShow(filtred)
    }
    ,[filters]
  )

  const handleFilterChange = (e: { target: { name: any; value: any; }; }) => {
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
                <th className="p-2 border">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredSpaces.map((ws) => (
                <tr key={ws.id} className="text-center border">
                  <td className="p-2 border">{ws.id}</td>
                  <td className="p-2 border">{ws.workspaceName}</td>
                  <td className="p-2 border">{ws.departement}</td>
                  <td className="p-2 border">{ws.floor ?? "-"}</td>
                  <td className="p-2 border">{new Date(ws.time).toUTCString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
