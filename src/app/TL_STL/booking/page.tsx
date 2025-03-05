"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "tailwindcss/tailwind.css";
import Card from "./test2/card";
import IdCard from "./test2/IdCard";

const cardData = [
  {
    id: 101,
    title: "Meeting Room A",
    department: "Business",
    team: "Strategy",
    author: "Alice Smith",
    date: "2024-02-28",
  },
  {
    id: 102,
    title: "Conference Hall B",
    department: "Operations",
    team: "Management",
    author: "John Doe",
    date: "2024-02-29",
  },
  {
    id: 103,
    title: "Private Office C",
    department: "IT",
    team: "Development",
    author: "Michael Johnson",
    date: "2024-03-01",
  },
];

const Page: React.FC = () => {
  const router = useRouter();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrer les cartes en fonction de la recherche
  const filteredCards = cardData.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-screen h-screen">
      {/* Sidebar */}
      <div className="absolute top-0 left-0 w-[149px] h-screen bg-gradient-to-b from-green-600 to-cyan-600 z-10 flex flex-col items-center">
        <img
          src="/acdff8367aec6e42b2edc5e13ceb96de.png"
          alt="Logo"
          className="w-[101px] h-[47px] border border-white mt-12"
        />
        <div className="mt-12 space-y-10">
          {/* Home Button (Redirection) */}
          <button
            onClick={() => router.push("/home")}
            className="flex flex-col items-center"
          >
            <img src="/home.png" alt="Home" className="w-10 h-10" />
            <span className="text-white text-sm font-medium mt-1">Home</span>
          </button>

          {/* Booking Button (Reste sur la page actuelle) */}
          <button className="flex flex-col items-center">
            <img src="/calendar.png" alt="Booking" className="w-10 h-10" />
            <span className="text-white text-sm font-medium mt-1">Booking</span>
          </button>
        </div>
      </div>

      {/* Top Navigation */}
      <div className="absolute top-0 left-[149px] w-full h-[110px] bg-white flex items-center justify-between px-10 shadow-md">
        <img
          src="/e0c95322b9cf37d94426349c6b9126d4.png"
          alt="Logo"
          className="w-[180px] h-[90px]"
        />
        <div className="flex items-center space-x-6">
          <div className="w-[185px] h-[47px] rounded-[20px] bg-gradient-to-r from-green-500/50 to-cyan-500/50 flex justify-center items-center text-lg font-semibold text-black">
            TL/STL
          </div>
          <img src="/notifications.png" className="w-7 h-7" alt="Notifications" />
          <img src="/ellipse-1.png" className="w-12 h-12 rounded-full" alt="Avatar" />
          <h1 className="text-lg font-semibold">Yasmina Bouchra</h1>
        </div>
      </div>

      {/* Filter & Search Section */}
      <div className="absolute top-[130px] left-[160px] right-10 flex items-center justify-between px-8 w-[calc(100%-180px)]">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold">Booked spaces</span>
          <div className="w-28 h-[3px] bg-black"></div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium">Search:</span>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setSearchQuery("")} // Reset Search
          >
            Reset
          </button>
          <i className="fas fa-filter text-xl cursor-pointer"></i>
          <span className="text-lg font-medium">Filter</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute top-[180px] left-[160px] right-10 bottom-10 bg-gray-100 p-6 flex flex-wrap gap-6 rounded-lg shadow-md">
        <div className="grid grid-cols-3 gap-6">
          {filteredCards.length > 0 ? (
            filteredCards.map((card, index) => (
              <Card
                key={card.id}
                title={card.title}
                department={card.department}
                team={card.team}
                author={card.author}
                date={card.date}
                onClick={() => setActiveCard(index)}
              />
            ))
          ) : (
            <p className="text-gray-600 text-lg">No results found.</p>
          )}
        </div>

        {/* ID Card affichée lorsqu'on clique sur une carte */}
        {activeCard !== null && filteredCards.length > 0 && (
          <IdCard
            id={filteredCards[activeCard].id}
            jobTitle={filteredCards[activeCard].title}
            name={filteredCards[activeCard].author}
            team={filteredCards[activeCard].team}
            imageSrc="/image-11.png"
            visible={true}
            onClose={() => setActiveCard(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Page;