'use client';

import { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { PiCalendarDotsFill } from "react-icons/pi";
import { Header } from "@/app/components/collabHeader";

interface Reservation {
  time: string;
  room: string;
  floor: string;
}

interface Stats {
  name: string;
  total: number;
  available: number;
  yours: number;
  last: Reservation[];
}

export default function Page() {
  const [data, setData] = useState<Stats | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const id = localStorage.getItem("id") || sessionStorage.getItem("id");

    fetch(`/api/collab/getStats?id=${id}`, {
      headers: {
        Authorization: token!,
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.json().then((d: Stats) => {
        console.log(d);
        setData(d);
      })
    );
  }, []);

  if (!data) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      {Header(data.name)}

      <main className="h-full flex flex-col justify-between p-2">
        <div className="grid grid-cols-3 gap-4 m-5">
          <StatCard title="Total Bookings:" value={data.total} bg="rgba(120,216,123,0.44)" />
          <StatCard title="Available Spaces:" value={data.available} bg="rgba(180,244,217,1)" />
          <StatCard title="Your Bookings:" value={data.yours} bg="rgba(146,223,213,1)" />
        </div>

        <div className="flex justify-end items-end">
          <div className="w-[50vw] bg-white p-5 rounded-xl shadow-xs border-2 border-[rgba(6,6,17,0.1)]">
            <h1 className="text-[rgba(6,6,17,0.6)] mb-5">Reservation History</h1>
            <div className="grid grid-cols-2">
              {data.last.map((e,i) => renderReservation(e.time, e.room, e.floor,i))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const StatCard = ({
  title,
  value,
  bg,
}: {
  title: string;
  value: number;
  bg: string;
}) => (
  <div
    className="w-[20vw] h-[10vh] flex justify-center items-center flex-col rounded-2xl font-bold"
    style={{ backgroundColor: bg }}
  >
    <h3>{title}</h3>
    <h4>{value}</h4>
  </div>
);

const renderReservation = (time: string, room: string, floor: string, key :any) => {
  return (
    <div className="m-2" key = {key}>
      <div className="flex items-center">
        <div className="text-[rgba(74,166,89,1)] text-xl p-2 bg-[rgba(120,216,123,0.24)] w-fit m-2">
          <PiCalendarDotsFill />
        </div>
        <div>
          <h3>{time}</h3>
        </div>
      </div>
      <div className="flex">
        <div className="text-[rgba(74,166,89,1)] text-xl p-2 bg-[rgba(120,216,123,0.24)] w-fit m-2">
          <IoLocationSharp />
        </div>
        <div>
          <h3>{room}</h3>
          <h6 className="text-sm text-[rgba(6,6,17,0.6)]">{floor}</h6>
        </div>
      </div>
    </div>
  );
};
