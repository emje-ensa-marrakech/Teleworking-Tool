"use client";

import React, { useState } from "react";

interface Room {
    id: number;
    name: string;
    department: string;
    floor: number;
    plateau: number;
}



const RoomCard: React.FC<{ room: Room }> = ({ room }) => {
    return (
        <div className="card-room">
            <div className="info-room">
                <div className="room">{room.name}</div>
                <div className="info1-room">
                    <p><span className="bold">Department:</span> {room.department}</p>
                </div>
                <div className="info2-room">
                    <p><span className="bold">Floor:</span> Floor {room.floor}</p>
                </div>
                <div className="actions">
                    <button className="reserve">Reserve Room</button>
                </div>
            </div>
        </div>
    );
};

export default function Map2() {
    const [filter, setFilter] = useState({ plateau: "1", floor: 1, date: "" });

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { id, value } = e.target;
        setFilter({
            ...filter,
            [id]: id === "plateau" ? value : value === "" ? "" : id === "date" ? value : Number(value),
        });
    };
    return (
<div className="map2">
    <div className="container">

        <div className="nav2">
            <div className="logo2">
                <img src="./booking/image-removebg-preview 4.png" alt=""/>
            </div>
            <div className="conent">
                <a href="#">
                    <div className="li">
                    <img src="./map2/home.png" alt=""/>
                        <h6>Home</h6>
                    </div>
                </a>
                
                <a href="#">
                    <div className="li">
                        <img src="./map2/map.png" alt=""/>
                        <h6>Spaces</h6>
                    </div>
                </a>
                
                <a href="#">
                    <div className="li">
                        <img src="./map2/history.png" alt=""/>
                        <h6>History</h6>
                    </div>
                </a>
                
            </div>
            <a href="#">
                <div className="li">
                    <img src="./map2/settings.png" alt=""/>
                    <h6>Settings</h6>
                </div>
            </a>

        </div>

        <div className="nav1">
            <div className="logo">
                <img src="./map2/image-removebg-preview 2.jpg" alt="Logo" className="logoimg"/>
            </div>
            <div className="content">
                <button className="reserve-rooms">Reserve Room</button>

                <i className="fa-regular fa-bell notification-icon"></i>

                <div className="avatar">O</div>
                <h1 className="username">Oumnia</h1>
            </div>
        </div>

        </div>
        <div className="filter2">
                <form className="filter-salles">
                    <div>
                        <label htmlFor="plateau">Plateau:</label>
                        <select id="plateau" value={filter.plateau} onChange={handleFilterChange} required>
                            <option value="1">Plateau 1</option>
                            <option value="2">Plateau 2</option>
                            <option value="3">Plateau 3</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="floor">Floor:</label>
                        <select id="floor" value={filter.floor} onChange={handleFilterChange} required>
                            <option value="1">Floor 1</option>
                            <option value="2">Floor 2</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="date">Date:</label>
                        <input type="date" id="date" value={filter.date} onChange={handleFilterChange} required />
                    </div>
                </form>
            </div>

            <div className="container-reserve-room">
        


            </div>
</div>
);
}
