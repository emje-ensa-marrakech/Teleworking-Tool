"use client";
import { useEffect, useState } from "react";
import Card from "./card";
import IdCard from "./card_id";
import { Bell, Home, Map, FileUser, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface User {
  userId: string;
  name: string;
  department: string;
  type: string;
}

interface Workspace {
  name: string;
}

interface Reservation {
  id: number;
  time: string;
  confirmed: boolean;
  user: User;
  workspace: Workspace;
}

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("/api/TLorTLS/get-all-reservations");
        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }
        const data = await response.json();
        setReservations(data.reservations || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch reservations"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleConfirmChange = async (id: number, confirmed: boolean) => {
    try {
      const response = await fetch(`/api/TLorTLS/update-reservation/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirmed }),
      });

      if (!response.ok) {
        throw new Error("Failed to update reservation");
      }

      const data = await response.json();
      setReservations((prev) =>
        prev.map((res) =>
          res.id === id ? { ...res, confirmed: data.reservation.confirmed } : res
        )
      );
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const filteredReservations = reservations.filter(
    (res) =>
      res.workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalReservations = filteredReservations.length;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-t-4 border-green-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
        <p className="ml-4 text-xl font-semibold text-green-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 p-4">Error: {error}</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      

      <main className="flex-1 p-6">
       

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Booked Spaces</h1>
            <div className="relative">
              <input
                type="text"
                className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-2 top-2.5 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredReservations.length > 0 ? (
            filteredReservations.map((reservation) => (
              <Card
                key={reservation.id}
                title={reservation.workspace.name}
                department={reservation.user.department}
                team={reservation.user.department}
                author={reservation.user.name}
                date={new Date(reservation.time).toLocaleDateString()}
                onClick={() => setSelectedReservation(reservation)}
                onConfirmChange={handleConfirmChange}
                confirmed={reservation.confirmed}
                id={reservation.id}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No reservations found matching your search.
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="bg-white p-4 rounded-lg shadow flex justify-between">
          <div className="text-lg font-semibold">
            Booked Spaces:{" "}
            <span className="text-blue-600">{totalReservations}</span>
          </div>
          <div className="text-lg font-semibold">
            Available Spaces:{" "}
            <span className="text-green-600">{22-totalReservations}</span>
          </div>
        </div>
      </main>

      {/* ID Card Modal */}
      {selectedReservation && (
        <IdCard
          id={parseInt(selectedReservation.user.userId) || 0}
          jobTitle={selectedReservation.user.type || "N/A"}
          name={selectedReservation.user.name || "Unknown"}
          team={selectedReservation.user.department || "No Department"}
          imageSrc="/booking/imgpro.jpg"
          visible={true}
          onClose={() => setSelectedReservation(null)}
        />
      )}
    </div>
  );
}