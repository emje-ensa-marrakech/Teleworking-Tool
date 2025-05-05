'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';

interface IdCardProps {
  id: number;
  jobTitle: string;
  name: string;
  team: string;
  imageSrc: string;
  visible: boolean;
  onClose: () => void;
}

const IdCard: React.FC<IdCardProps> = ({
  jobTitle,
  name,
  team,
  imageSrc,
  visible,
  onClose,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  if (!visible) return null;

  const handleDateChange = (date: Date | null) => {
    if (!date) return;

    setSelectedDates((prevDates) => {
      const exists = prevDates.some((d) => d.getTime() === date.getTime());
      return exists
        ? prevDates.filter((d) => d.getTime() !== date.getTime())
        : [...prevDates, date];
    });
  };

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
          <Image
            src={imageSrc}
            alt={name}
            width={80}
            height={80}
            className="rounded-full"
          />
          <h2 className="text-xl font-bold mt-4">{name}</h2>
          <p className="text-gray-600">{jobTitle}</p>
          <p className="text-gray-500">{team}</p>

          <button
            className="mt-4 flex items-center space-x-2"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <Image
              src="/booking/calendar.png"
              alt="Calendar"
              width={32}
              height={32}
              className="cursor-pointer"
              style={{ filter: 'invert(1)' }}
            />
            <span className="text-gray-600">
              {selectedDates.length > 0
                ? selectedDates.map((date) => date.toDateString()).join(', ')
                : 'Select dates'}
            </span>
          </button>

          {showCalendar && (
            <div className="mt-2 bg-white p-2 shadow-lg rounded-lg">
              <DatePicker
                selected={null}
                onChange={handleDateChange}
                inline
                highlightDates={selectedDates}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdCard;
