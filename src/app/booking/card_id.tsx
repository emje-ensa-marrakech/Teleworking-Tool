"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IdCardProps {
  id: number;
  jobTitle: string;
  name: string;
  team: string;
  imageSrc: string;
  visible: boolean;
  onClose: () => void;
}

const IdCard: React.FC<IdCardProps> = ({ id, jobTitle, name, team, imageSrc, visible, onClose }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white shadow-lg p-6 rounded-lg w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 font-bold text-xl"
        >
          &times;
        </button>
        <div className="flex flex-col items-center">
          <img src={imageSrc} alt={name} className="w-20 h-20 rounded-full" />
          <h2 className="text-xl font-bold mt-4">{name}</h2>
          <p className="text-gray-600">{jobTitle}</p>
          <p className="text-gray-500">{team}</p>
          
          {/* Icône du calendrier */}
          <button
            className="mt-4 flex items-center space-x-2"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <img src="./booking/calendar.png" alt="Calendar" className="w-8 h-8 cursor-pointer" style={{ filter: "invert(1)" }}/>
            <span className="text-gray-600">{selectedDate ? selectedDate.toDateString() : "Select a date"}</span>
          </button>

          {/* Affichage du calendrier */}
          {showCalendar && (
            <div className="mt-2 bg-white p-2 shadow-lg rounded-lg">
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                inline
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdCard;