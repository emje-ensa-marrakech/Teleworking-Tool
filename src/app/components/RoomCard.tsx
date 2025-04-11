// components/RoomCard.tsx
import React, { useRef, useEffect } from "react";
import { RoomData } from "../collaborator/map/type";

interface RoomCardProps {
  roomData: RoomData;
  permission: boolean;
  onClose: () => void; // Function to close the card
  onReserveRelease: () => void; // Function to handle reserve/release
}

const RoomCard: React.FC<RoomCardProps> = ({
  roomData,
  permission,
  onClose,
  onReserveRelease,
}) => {
  const cardRef = useRef<HTMLDivElement>(null); // Ref for the card container

  // Close the card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose(); // Close the card
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleReserveRelease = () => {
    onReserveRelease(); // Call the reserve/release function
    onClose(); // Close the card after reserve/release
  };

  return (
    <div
      ref={cardRef} // Attach the ref to the card container
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-black w-[300px] p-5 rounded-lg shadow-md text-left font-sans"
    >
      <h3 className="text-xl font-bold">{roomData.name}</h3>
      <p className="my-2 text-gray-800">ID: {roomData.id}</p>
      <p className="my-2 text-gray-800">Department: {roomData.departement}</p>
      <p className="my-2 text-gray-800">
        Status: {roomData.status ? "Available" : "Reserved"}
      </p>
      <p className="my-2 text-gray-800">
        Available: {roomData.available || "N/A"}
      </p>
      <p className="my-2 text-gray-800">Floor: {roomData.floor || "N/A"}</p>
      <p className="my-2 text-gray-800">
        Capacity: {roomData.capacity || "N/A"}
      </p>
      <p className="my-2 text-gray-800">Expired: {roomData.expired || "N/A"}</p>
      <button
        className="bg-red-500 text-white px-3 py-2 rounded-lg cursor-pointer mt-3"
        onClick={onClose} // Close the card
      >
        Close
      </button>
      {permission && roomData.status === true && (
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded-lg cursor-pointer mt-4 ml-1"
          onClick={handleReserveRelease} // Reserve/Release and close the card
        >
          {roomData.fill === "#c1f1ba" ? "Reserve" : "Release"}
        </button>
      )}
    </div>
  );
};

export default RoomCard;
