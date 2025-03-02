"use client";
import React, { useState } from "react";
import Card from "./card";
import IdCard from "./card_id"; // Vérifie que le fichier a le bon nom et chemin

interface Reservation {
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


export default function booking(){


    // Liste des réservations (Exemple, à remplacer par des données dynamiques si besoin)
    const reservations: Reservation[] = [
        { 
            id: 1, title: "Meeting Room 1", department: "HR", team: "Recruitment", 
            author: "John Doe", date: "2025-03-02", jobTitle: "Recruiter", 
            name: "John Doe", imageSrc: "./booking/imgpro.jpg" 
        },
        { 
            id: 2, title: "Conference Hall", department: "IT", team: "Development", 
            author: "Alice Smith", date: "2025-03-05", jobTitle: "Developer", 
            name: "Alice Smith", imageSrc: "./booking/imgpro.jpg" 
        },
        { 
            id: 3, title: "Private Office", department: "Finance", team: "Accounting", 
            author: "Bob Brown", date: "2025-03-10", jobTitle: "Accountant", 
            name: "Bob Brown", imageSrc: "./booking/imgpro.jpg" 
        }
    ];

    // État pour stocker la réservation sélectionnée et afficher l'ID Card
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);


    return (
<div className="booking">
    <div className="container">

        <div className="nav2">
            <div className="logo2">
                <img src="./booking/image-removebg-preview 4.png" alt=""/>
            </div>
            <div className="conent">
                <a href="#">
                    <div className="li">
                    <img src="./booking/home.png" alt=""/>
                        <h6>Home</h6>
                    </div>
                </a>
                
                <a href="#">
                    <div className="li">
                        <img src="./booking/map.png" alt=""/>
                        <h6>Spaces</h6>
                    </div>
                </a>
                
                <a href="#">
                    <div className="li">
                        <img src="./booking/calendar.png" alt=""/>
                        <h6>Booking</h6>
                    </div>
                </a>
                
                <a href="#">
                    <div className="li">
                        <img src="./booking/person.png" alt=""/>
                        <h6>Collaborators</h6>
                    </div>
                </a>
            </div>
            <a href="#">
                <div className="li">
                    <img src="./booking/settings.png" alt=""/>
                    <h6>Settings</h6>
                </div>
            </a>

        </div>

        <div className="nav1">
            <div className="logo">
                <img src="./booking/image-removebg-preview 2.jpg" alt="Logo" className="logoimg"/>
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
            <input type="text" className="search-input" placeholder="search..."/>
        </div>
        </div>
        <div className="container-card">

        <div className="continer2">
            <div className="cards">
                            {/* Affichage dynamique des cartes */}
                            {reservations.map((reservation) => (
                                <Card
                                    key={reservation.id}
                                    title={reservation.title}
                                    department={reservation.department}
                                    team={reservation.team}
                                    author={reservation.author}
                                    date={reservation.date}
                                    onClick={() => setSelectedReservation(reservation)}
                                />
                            ))}
            </div>
                    <div className="spacesnbr">
                        <div className="booked-spaces">Booked Spaces :</div>
                        <div className="available-spaces">Available Spaces :</div>
                    </div>
        </div>
       </div>
        {/* Affichage de l'ID Card lorsqu'on clique sur une carte */}
        {selectedReservation && (
                <IdCard
                    id={selectedReservation.id}
                    jobTitle={selectedReservation.jobTitle}
                    name={selectedReservation.name}
                    team={selectedReservation.team}
                    imageSrc={selectedReservation.imageSrc}
                    visible={!!selectedReservation}
                    onClose={() => setSelectedReservation(null)}
                />
            )}

</div>
);
}
