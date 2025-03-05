// app/page.tsx
"use client";

import React, { useState } from "react";
import RoomCard from "../components/RoomCard";
import { RoomData } from "./type";
import FirstEtage from "./FirstEtage";
import SecondeEtage from "./SecondeEtage";
import data from "./data.json";

const Home: React.FC = () => {
  const [rooms, setRooms] = useState<RoomData[]>(data);
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<string>("");
  const permission = true;

  const handleRoomClick = (room: RoomData) => {
    setSelectedRoom(room);
  };

  const handleCloseCard = () => {
    setSelectedRoom(null);
  };

  const handleReserveRelease = (roomId: string) => {
    setRooms((prevRooms) => {
      return prevRooms.map((room) => {
        if (room.id === roomId) {
          return {
            ...room,
            fill: "#f1e4ba",
          };
        } else {
          return room;
        }
      });
    });
    setSelectedRoom(null);
  };

  const handleFloorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedFloor(value);
  };

  return (
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
      <div className="mapGide absolute top-[270px] right-[200px] border-[1px] border-black p-[10px]">
        <div className="pair flex gap-[5px] items-center">
            <div className="w-[30px] h-[30px] border-[1px] border-black bg-[#c1f1ba] mb-[5px]" ></div><div>Available</div>
        </div>
        <div className="pair flex gap-[5px] items-center">
            <div className="w-[30px] h-[30px] border-[1px] border-black bg-[#fdbaa9] mb-[5px]" ></div><div>Reserved</div>
        </div>
        <div className="pair flex gap-[5px] items-center">
            <div className="w-[30px] h-[30px] border-[1px] border-black bg-[#f1e4ba] mb-[5px]" ></div><div>Pending</div>
        </div>
        <div className="pair flex gap-[5px] items-center">
            <div className="w-[30px] h-[30px] border-[1px] border-black bg-[lightgrey] mb-[5px]" ></div><div>Not Exist</div>
        </div>
      </div>
      <div className="p-2 flex justify-center items-center rounded-full absolute top-[115px] left-[400px]">
        <div className="flex flex-col items-center w-40 h-24 mx-2">
          <h3 className="mb-1 text-sm font-semibold">Floor:</h3>
          <select 
            name="floor" 
            id="floor" 
            className="p-2 border border-black rounded-full text-sm"
            onChange={handleFloorChange}
          >
            <option value="" disabled selected>Select a Floor</option>
            <option value="floor1">Floor 1</option>
            <option value="floor2">Floor 2</option>
          </select>
        </div>
        <div className="flex flex-col items-center w-40 h-24 mx-2">
          <h3 className="mb-1 text-sm font-semibold">Plateau:</h3>
          <select name="plateau" id="plateau" className="p-2 border border-black rounded-full text-sm">
            <option selected disabled>Select a Plateau</option>
            <option value="plateauA">Plateau A</option>
            <option value="plateauB">Plateau B</option>
            <option value="plateauC">Plateau C</option>
          </select>
        </div>
        <div className="flex flex-col items-center w-40 h-24 mx-2">
          <h3 className="mb-1 text-sm font-semibold">Date:</h3>
          <select name="plateau" id="plateau" className="p-2 border border-black rounded-full text-sm">
            <option selected disabled>Select a Mounth</option>
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="october">October</option>
            <option value="november">November</option>
            <option value="december">December</option>
          </select>
        </div>
      </div>
      {selectedFloor === "floor2" ? (
          <SecondeEtage rooms={rooms} onRoomClick={handleRoomClick} />
        ) : (
          <FirstEtage rooms={rooms} onRoomClick={handleRoomClick} />
        )}

      {selectedRoom && (
        <RoomCard
          roomData={selectedRoom}
          permission={permission}
          onClose={handleCloseCard}
          onReserveRelease={() => handleReserveRelease(selectedRoom.id)}
        />
      )}
    </div>
  );
};

export default Home;
