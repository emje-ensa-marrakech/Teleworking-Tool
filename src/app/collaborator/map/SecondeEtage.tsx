// app/SecondeEtage.tsx
import React from "react";
import { RoomData } from "./type";
import { roomPosition2 } from "./roomPosition2";
import data from "./data.json";

interface SecondeEtageProps {
  rooms: RoomData[]; // Add rooms prop
  onRoomClick: (room: RoomData) => void; // Ensure this prop is defined
}

const SecondeEtage: React.FC<SecondeEtageProps> = ({ rooms, onRoomClick }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 400"
        className="w-[650px] h-[325px] absolute top-[380px] left-[550px] overflow-visible transform -translate-x-1/2 -translate-y-1/2"
      >
        {/* Render walls and lines */}
        <line x1="0" y1="80" x2="0" y2="380" stroke="black" stroke-width="2" />
        <line x1="75" y1="0" x2="800" y2="0" stroke="black" stroke-width="2" />
        <line x1="800" y1="0" x2="800" y2="400" stroke="black" stroke-width="2" />
        <line x1="800" y1="400" x2="120" y2="400" stroke="black" stroke-width="2" />
        <line x1="120" y1="400" x2="800" y2="400" stroke="black" stroke-width="2" />
        <line x1="120" y1="380" x2="120" y2="400" stroke="black" stroke-width="2" />
        <line x1="120" y1="380" x2="0" y2="380" stroke="black" stroke-width="2" />
        <line x1="75" y1="80" x2="0" y2="80" stroke="black" stroke-width="2" />
        <line x1="75" y1="0" x2="75" y2="80" stroke="black" stroke-width="2" />
        
        <line x1="75" y1="80" x2="100" y2="80" stroke="black" stroke-width="2" />
        <line x1="100" y1="80" x2="100" y2="120" stroke="black" stroke-width="2" />
        <line x1="0" y1="210" x2="100" y2="210" stroke="black" stroke-width="2" />
        <line x1="75" y1="80" x2="100" y2="80" stroke="black" stroke-width="2" />
        <line x1="100" y1="210" x2="100" y2="150" stroke="black" stroke-width="2" />
        <line x1="100" y1="210" x2="100" y2="216" stroke="black" stroke-width="2" />
        <line x1="100" y1="380" x2="100" y2="250" stroke="black" stroke-width="2" />

        <line x1="210" y1="0" x2="210" y2="110" stroke="black" stroke-width="2" />
        <line x1="210" y1="110" x2="140" y2="110" stroke="black" stroke-width="2" />
        <line x1="140" y1="110" x2="140" y2="70" stroke="black" stroke-width="2" />
        <line x1="240" y1="75" x2="300" y2="75" stroke="black" stroke-width="2" />
        <line x1="300" y1="0" x2="300" y2="75" stroke="black" stroke-width="2" />
        <line x1="300" y1="60" x2="370" y2="60" stroke="black" stroke-width="2" />
        <line x1="370" y1="0" x2="370" y2="60" stroke="black" stroke-width="2" />
        <line x1="370" y1="0" x2="370" y2="90" stroke="black" stroke-width="2" />
        <line x1="370" y1="90" x2="440" y2="90" stroke="black" stroke-width="2" />
        <line x1="470" y1="0" x2="470" y2="90" stroke="black" stroke-width="2" />
        <line x1="470" y1="90" x2="466" y2="90" stroke="black" stroke-width="2" />
        <line x1="470" y1="90" x2="474" y2="90" stroke="black" stroke-width="2" />
        <line x1="500" y1="90" x2="610" y2="90" stroke="black" stroke-width="2" />
        <line x1="610" y1="0" x2="610" y2="90" stroke="black" stroke-width="2" />
        <line x1="610" y1="90" x2="680" y2="90" stroke="black" stroke-width="2" />
        <line x1="700" y1="0" x2="700" y2="90" stroke="black" stroke-width="2" />
        <line x1="695" y1="90" x2="700" y2="90" stroke="black" stroke-width="2" />
        <line x1="700" y1="90" x2="705" y2="90" stroke="black" stroke-width="2" />
        <line x1="705" y1="90" x2="710" y2="90" stroke="black" stroke-width="2" />
        <line x1="730" y1="90" x2="800" y2="90" stroke="black" stroke-width="2" />

        <line x1="120" y1="380" x2="120" y2="340" stroke="black" stroke-width="2" />
        <line x1="120" y1="340" x2="140" y2="340" stroke="black" stroke-width="2" />
        <line x1="260" y1="400" x2="260" y2="340" stroke="black" stroke-width="2" />
        <line x1="260" y1="340" x2="250" y2="340" stroke="black" stroke-width="2" />
        <line x1="340" y1="400" x2="340" y2="250" stroke="black" stroke-width="2" />
        <line x1="340" y1="250" x2="210" y2="250" stroke="black" stroke-width="2" />
        <line x1="210" y1="250" x2="210" y2="300" stroke="black" stroke-width="2" />
        <line x1="340" y1="250" x2="340" y2="160" stroke="black" stroke-width="2" />
        <line x1="210" y1="250" x2="210" y2="160" stroke="black" stroke-width="2" />
        <line x1="210" y1="160" x2="300" y2="160" stroke="black" stroke-width="2" />
        <line x1="340" y1="160" x2="330" y2="160" stroke="black" stroke-width="2" />
        <line x1="440" y1="400" x2="440" y2="270" stroke="black" stroke-width="2" />
        <line x1="240" y1="250" x2="440" y2="250" stroke="black" stroke-width="2" />
        <line x1="440" y1="250" x2="440" y2="255" stroke="black" stroke-width="2" />
        <line x1="440" y1="250" x2="440" y2="246" stroke="black" stroke-width="2" />
        <line x1="340" y1="160" x2="340" y2="150" stroke="black" stroke-width="2" />
        <line x1="340" y1="150" x2="440" y2="150" stroke="black" stroke-width="2" />
        <line x1="440" y1="150" x2="440" y2="210" stroke="black" stroke-width="2" />
        <line x1="500" y1="400" x2="500" y2="310" stroke="black" stroke-width="2" />
        <line x1="500" y1="310" x2="480" y2="310" stroke="black" stroke-width="2" />
        <line x1="210" y1="300" x2="220" y2="300" stroke="black" stroke-width="2" />
        <line x1="150" y1="300" x2="150" y2="250" stroke="black" stroke-width="2" />
        <line x1="150" y1="250" x2="170" y2="250" stroke="black" stroke-width="2" />
        <line x1="150" y1="250" x2="170" y2="250" stroke="black" stroke-width="2" />
        <line x1="170" y1="250" x2="170" y2="260" stroke="black" stroke-width="2" />
        <line x1="170" y1="250" x2="170" y2="240" stroke="black" stroke-width="2" />
        <line x1="150" y1="250" x2="150" y2="180" stroke="black" stroke-width="2" />
        <line x1="170" y1="250" x2="170" y2="260" stroke="black" stroke-width="2" />
        <line x1="150" y1="180" x2="210" y2="180" stroke="black" stroke-width="2" />

       {/* Render rooms */}
        {
  Object.keys(roomPosition2).map((id) => {
    // Check if the room with this id exists in data.json
    const roomData = data.find(r => r.id === id);

    // Get the layout for this id from roomPosition2
    const layout = roomPosition2[id];

    // Determine the fill color based on whether the room exists in data.json
    const fillColor = roomData ? (roomData.status ? "#c1f1ba" : "#fdbaa9") : "lightgrey"; // If room exists, use its fill color; else grey

    return (
      <rect
        key={id}
        className="room transition-all duration-300 ease-in-out transform origin-center relative cursor-pointer" // Add cursor-pointer
        x={layout.x}
        y={layout.y}
        width={layout.width}
        height={layout.height}
        fill={fillColor} // Use determined fill color
        stroke="grey"
        strokeWidth="2"
        onClick={() => onRoomClick(roomData || { id, name: `Room ${id}`, status: false })} // Handle the click event
      />
    );
  })
}
      </svg>
    </div>
  );
};

export default SecondeEtage;