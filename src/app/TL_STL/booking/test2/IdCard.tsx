import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Image from "next/image";

interface IdCardProps {
  id: number;
  jobTitle: string;
  name: string;
  team: string;
  imageSrc: string;
  visible: boolean;
  onClose: () => void;
}

const IdCard: React.FC<IdCardProps> = ({ jobTitle, name, team, imageSrc, visible, onClose }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const handleDateChange = (date: Date) => {
    setSelectedDates((prevDates) => {
      const exists = prevDates.some((d) => d.toDateString() === date.toDateString());
      return exists ? prevDates.filter((d) => d.toDateString() !== date.toDateString()) : [...prevDates, date];
    });
  };

  const handleApply = () => {
    console.log("Selected Dates:", selectedDates);
    alert(`You selected: ${selectedDates.map((d) => d.toDateString()).join(", ")}`);
  };

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
          <Image src={imageSrc} alt={name} className="w-20 h-20 rounded-full" />
          <h2 className="text-xl font-bold mt-4">{name}</h2>
          <p className="text-gray-600">{jobTitle}</p>
          <p className="text-gray-500">{team}</p>
          
          <button
            className="mt-4 flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <Image src="/calendar.png" alt="Calendar" className="w-6 h-6" />
            <span>Select Dates</span>
          </button>

          {showCalendar && (
            <div className="mt-2 bg-white p-2 shadow-lg rounded-lg">
              <DatePicker
                onChange={(date: Date | null) => date && handleDateChange(date)}
                inline
                highlightDates={selectedDates}
              />
            </div>
          )}

          {selectedDates.length > 0 && (
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold">Selected Dates:</h3>
              <p className="text-gray-700">{selectedDates.map((d) => d.toDateString()).join(", ")}</p>
            </div>
          )}

          {selectedDates.length > 0 && (
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
              onClick={handleApply}
            >
              Apply
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdCard;