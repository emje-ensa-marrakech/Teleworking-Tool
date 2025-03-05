"use client";
import { useEffect, useState } from "react";
import Card from "./card";
import IdCard from "./card_id";

interface Reservation {
  [x: string]: any;
  id: number;
  title: string;
  department: string;
  team: string;
  author: string;
  date: string;
  jobTitle: string;
  name: string;
  imageSrc: string;
}

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("/api/TLorTLS/get-all-reservations");
        const data = await response.json();

        if (data.status === "success") {
          setReservations(data.reservations);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to fetch reservations");
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

      // Update state with new confirmation status
      setReservations((prev) =>
        prev.map((res) =>
          res.id === id
            ? { ...res, confirmed: data.reservation.confirmed }
            : res
        )
      );
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  // Filter reservations based on search query
  const filteredReservations = reservations.filter(
    (res) =>
      res.workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalReservations = filteredReservations.length;

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-t-4 border-green-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
        <p className="ml-4 text-xl font-semibold text-green-700">Loading...</p>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="booking">
      <div className="container">
        <div className="nav2">
          <div className="logo2">
            <img src="./booking/image-removebg-preview 4.png" alt="" />
          </div>
          <div className="conent">
            <a href="#">
              <div className="li">
                <img src="./booking/home.png" alt="" />
                <h6>Home</h6>
              </div>
            </a>
            <a href="#">
              <div className="li">
                <img src="./booking/map.png" alt="" />
                <h6>Spaces</h6>
              </div>
            </a>
            <a href="#">
              <div className="li">
                <img src="./booking/calendar.png" alt="" />
                <h6>Booking</h6>
              </div>
            </a>
            <a href="#">
              <div className="li">
                <img src="./booking/person.png" alt="" />
                <h6>Collaborators</h6>
              </div>
            </a>
          </div>
          <a href="#">
            <div className="li">
              <img src="./booking/settings.png" alt="" />
              <h6>Settings</h6>
            </div>
          </a>
        </div>

        <div className="nav1">
          <div className="logo">
            <img
              src="./booking/image-removebg-preview 2.jpg"
              alt="Logo"
              className="logoimg"
            />
          </div>
          <div className="content">
            <button className="human-ressources">Human Resources</button>
            <i className="fa-regular fa-bell notification-icon"></i>
            <div className="avatar">O</div>
            <h1 className="username">Oumnia</h1>
          </div>
        </div>
      </div>

      <div className="filter">
        <span className="title1">Booked spaces</span>
        <span className="underline"></span>
        <div className="search">
          <span className="search-text">Search:</span>
          <i className="fas fa-search"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="container-card">
        <div className="continer2">
          <div className="cards">
            {/* Dynamically display filtered cards */}
            {filteredReservations.length > 0 ? (
              filteredReservations.map((reservation) => (
                <Card
                  key={reservation.id}
                  title={reservation.workspace.name}
                  department={reservation.user.department}
                  team={reservation.user.department}
                  author={reservation.user.name}
                  date={new Date(reservation.time).toISOString().split("T")[0]}
                  onClick={() => setSelectedReservation(reservation)}
                  onConfirmChange={handleConfirmChange}
                  confirmed={reservation.confirmed}
                  id={reservation.id}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">
                No reservations found.
              </p>
            )}
          </div>
          <div className="spacesnbr">
            <div className="booked-spaces">
              Booked Spaces: {totalReservations}
            </div>
            <div className="available-spaces">
              Available Spaces: {20 - totalReservations}
            </div>
          </div>
        </div>
      </div>
      {/* Display ID Card when a card is clicked */}
      {selectedReservation && selectedReservation.user && (
        <IdCard
          id={selectedReservation.user.userId}
          jobTitle={selectedReservation.user.type || "N/A"}
          name={selectedReservation.user.name || "Unknown"}
          team={selectedReservation.user.department || "No Department"}
          imageSrc={"booking/imgpro.jpg"}
          visible={!!selectedReservation}
          onClose={() => setSelectedReservation(null)}
        />
      )}
    </div>
  );
}
