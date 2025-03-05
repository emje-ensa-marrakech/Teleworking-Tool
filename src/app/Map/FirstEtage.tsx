// app/FirstEtage.tsx
import React from "react";
import { RoomData } from "./type";
import { roomPosition1 } from "./roomPosition1";
import data from "./data.json";

interface FirstEtageProps {
  rooms: RoomData[]; // Add rooms prop
  onRoomClick: (room: RoomData) => void; // Ensure this prop is defined
}

const FirstEtage: React.FC<FirstEtageProps> = ({ rooms, onRoomClick }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 400"
        className="w-[650px] h-[325px] absolute top-[380px] left-[550px] overflow-visible transform -translate-x-1/2 -translate-y-1/2"
      >
        {/* Render walls and lines */}
        <line x1="0" y1="100" x2="0" y2="350" stroke="black" strokeWidth="2" />
        <line x1="75" y1="0" x2="800" y2="0" stroke="black" strokeWidth="2" />
        <line x1="800" y1="0" x2="800" y2="400" stroke="black" strokeWidth="2" />
        <line x1="75" y1="350" x2="75" y2="400" stroke="black" strokeWidth="2" />
        <line x1="75" y1="400" x2="800" y2="400" stroke="black" strokeWidth="2" />

        <line x1="0" y1="100" x2="100" y2="100" stroke="black" strokeWidth="2" />
        <line x1="0" y1="200" x2="100" y2="200" stroke="black" strokeWidth="2" />
        <line x1="100" y1="100" x2="100" y2="125" stroke="black" strokeWidth="2" />
        <line x1="100" y1="175" x2="100" y2="200" stroke="black" strokeWidth="2" />

        <line x1="100" y1="200" x2="100" y2="250" stroke="black" strokeWidth="2" />
        <line x1="100" y1="275" x2="100" y2="350" stroke="black" strokeWidth="2" />
        <line x1="0" y1="350" x2="100" y2="350" stroke="black" strokeWidth="2" />

        <line x1="75" y1="0" x2="75" y2="100" stroke="black" strokeWidth="2" />
        <line x1="200" y1="0" x2="200" y2="110" stroke="black" strokeWidth="2" />
        <line x1="150" y1="110" x2="200" y2="110" stroke="black" strokeWidth="2" />
        <line x1="150" y1="80" x2="150" y2="110" stroke="black" strokeWidth="2" />
        

        <line x1="200" y1="75" x2="205" y2="75" stroke="black" strokeWidth="2" />
        <line x1="240" y1="75" x2="300" y2="75" stroke="black" strokeWidth="2" />
        <line x1="300" y1="0" x2="300" y2="75" stroke="black" strokeWidth="2" />

        <line x1="300" y1="65" x2="375" y2="65" stroke="black" strokeWidth="2" />
        <line x1="375" y1="0" x2="375" y2="100" stroke="black" strokeWidth="2" />
        <line x1="375" y1="100" x2="375" y2="100" stroke="black" strokeWidth="2" />
        <line x1="500" y1="0" x2="500" y2="100" stroke="black" strokeWidth="2" />
        <line x1="490" y1="100" x2="505" y2="100" stroke="black" strokeWidth="2" />
        <line x1="375" y1="100" x2="460" y2="100" stroke="black" strokeWidth="2" />
        
        <line x1="540" y1="100" x2="650" y2="100" stroke="black" strokeWidth="2" />
        <line x1="620" y1="0" x2="620" y2="100" stroke="black" strokeWidth="2" />
        
        
        <line x1="690" y1="100" x2="710" y2="100" stroke="black" strokeWidth="2" />
        <line x1="700" y1="0" x2="700" y2="100" stroke="black" strokeWidth="2" />
        
        <line x1="150" y1="150" x2="150" y2="300" stroke="black" strokeWidth="2" />
        <line x1="150" y1="325" x2="150" y2="400" stroke="black" strokeWidth="2" />
        <line x1="150" y1="325" x2="190" y2="325" stroke="black" strokeWidth="2" />
        <line x1="150" y1="175" x2="250" y2="175" stroke="black" strokeWidth="2" />
        <line x1="150" y1="225" x2="200" y2="225" stroke="black" strokeWidth="2" />
        <line x1="200" y1="220" x2="200" y2="230" stroke="black" strokeWidth="2" />
        <line x1="150" y1="300" x2="175" y2="300" stroke="black" strokeWidth="2" />

        
        <line x1="250" y1="150" x2="340" y2="150" stroke="black" strokeWidth="2" />
        <line x1="365" y1="150" x2="375" y2="150" stroke="black" strokeWidth="2" />
        <line x1="250" y1="150" x2="250" y2="305" stroke="black" strokeWidth="2" />
        <line x1="250" y1="305" x2="270" y2="305" stroke="black" strokeWidth="2" />
        <line x1="250" y1="250" x2="375" y2="250" stroke="black" strokeWidth="2" />
        <line x1="310" y1="250" x2="310" y2="275" stroke="black" strokeWidth="2" />
        <line x1="275" y1="325" x2="300" y2="325" stroke="black" strokeWidth="2" />
        <line x1="300" y1="325" x2="300" y2="400" stroke="black" strokeWidth="2" />
        
        
        <line x1="375" y1="140" x2="375" y2="400" stroke="black" strokeWidth="2" />
        <line x1="375" y1="140" x2="450" y2="140" stroke="black" strokeWidth="2" />
        <line x1="450" y1="140" x2="450" y2="250" stroke="black" strokeWidth="2" />
        <line x1="450" y1="275" x2="450" y2="325" stroke="black" strokeWidth="2" />
        <line x1="450" y1="340" x2="450" y2="400" stroke="black" strokeWidth="2" />
        <line x1="375" y1="300" x2="450" y2="300" stroke="black" strokeWidth="2" />

        
        <line x1="450" y1="350" x2="470" y2="350" stroke="black" strokeWidth="2" />
        <line x1="485" y1="350" x2="500" y2="350" stroke="black" strokeWidth="2" />
        <line x1="500" y1="350" x2="500" y2="400" stroke="black" strokeWidth="2" />
        
        
        <line x1="475" y1="140" x2="475" y2="155" stroke="black" strokeWidth="2" />
        <line x1="475" y1="155" x2="560" y2="155" stroke="black" strokeWidth="2" />
        <line x1="560" y1="140" x2="560" y2="155" stroke="black" strokeWidth="2" />
        
        <line x1="600" y1="140" x2="600" y2="155" stroke="black" strokeWidth="2" />
        <line x1="600" y1="155" x2="685" y2="155" stroke="black" strokeWidth="2" />
        <line x1="685" y1="140" x2="685" y2="155" stroke="black" strokeWidth="2" />

        
        <line x1="750" y1="100" x2="800" y2="100" stroke="black" strokeWidth="2" />
        <line x1="740" y1="140" x2="800" y2="140" stroke="black" strokeWidth="2" />
        <line x1="740" y1="140" x2="740" y2="190" stroke="black" strokeWidth="2" />
        <line x1="740" y1="190" x2="800" y2="190" stroke="black" strokeWidth="2" />

        {/* Render rooms */}
        {
  Object.keys(roomPosition1).map((id) => {
    // Check if the room with this id exists in data.json
    const roomData = data.find(r => r.id === id);

    // Get the layout for this id from roomPosition1
    const layout = roomPosition1[id];

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

export default FirstEtage;