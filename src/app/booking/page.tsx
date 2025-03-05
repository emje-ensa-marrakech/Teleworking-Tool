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

  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(
      reservations[0] || null
    );

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("/api/TLorTLS/get-all-reservations"); // Adjust the endpoint if needed
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
  const totalReservations = reservations.length;

  

  if (loading) return (
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
            <button className="human-ressources">Human Ressources</button>

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
          <span className="search-text">search :</span>
          <i className="fas fa-search"></i>
          <input type="text" className="search-input" placeholder="search..." />
        </div>
      </div>
      <div className="container-card">
        <div className="continer2">
          <div className="cards">   
            {/* Affichage dynamique des cartes */}
            {reservations.map((reservation) => (
              <Card
                key={reservation.id}
                title={reservation.workspace.name}
                department={reservation.user.department}
                team={reservation.user.department}
                author={reservation.user.name}
                date={new Date(reservation.time).toISOString().split("T")[0]}
                onClick={() => setSelectedReservation(reservation)}
                onConfirmChange={handleConfirmChange} // Pass function
                confirmed={reservation.confirmed} // Pass current status
                id={reservation.id}
              />
            ))}
          </div>
          <div className="spacesnbr">
            <div className="booked-spaces">
              Booked Spaces : {totalReservations}
            </div>
            <div className="available-spaces">Available Spaces : {20 -totalReservations}</div>
          </div>
        </div>
      </div>
      {/* Affichage de l'ID Card lorsqu'on clique sur une carte */}
      {selectedReservation && selectedReservation.user && (
        <IdCard
          id={selectedReservation.user.userId} // Assuming the user object has an 'id' field
          jobTitle={selectedReservation.user.type || "N/A"} // Adjust based on actual data
          name={selectedReservation.user.name || "Unknown"} // Ensure correct property
          team={selectedReservation.user.department || "No Department"} // Likely the correct field
          imageSrc={"booking/imgpro.jpg"} // Handle missing image
          visible={!!selectedReservation}
          onClose={() => setSelectedReservation(null)}
        />
      )}
    </div>
  );
}
