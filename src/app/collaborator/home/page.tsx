'use client';

import { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { PiCalendarDotsFill } from "react-icons/pi";

interface Reservation {
  time: string;
  workspaceName: string;
  floor: string;
}


const formatDate = (date: Date | null) => {
  if (!date) return null;
  return date.toISOString().split("T")[0]; // yyyy-mm-dd
};

export default function Page() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const id = localStorage.getItem("id") || sessionStorage.getItem("id");

    fetch(`/api/generale/getStats?id=${id}`, {
      headers: {
        Authorization: token!,
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.json().then((d: any) => {
        console.log(d);
        setData(d);
        console.log(d);
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
    <main className="h-full flex flex-col  p-2">
      {/* New stat section with more cards */}
      <div className="flex flex-wrap justify-center gap-8 m-5">
        <StatCard title="Total Spaces:" value={data.salles} bg="rgba(120, 216, 123, 0.66)" />
        <StatCard title="Total Bookings:" value={data.total} bg="rgb(180, 244, 217)" />
        <StatCard title="Available Spaces:" value={data.available} bg="rgb(146, 223, 213)" />
        <div className="w-full flex justify-center gap-8 m-5">
          <StatCard title="Your Bookings:" value={data.your} bg="rgba(121, 212, 191, 0.6)" />
          <StatCard title="Pending approvals:" value={data.pending} bg="rgba(25, 210, 139, 0.53)" />
        </div>
      </div>

      {/* Reservation History */}
      <div className="flex justify-center items-center w-full my-10">
        <div className="w-[50vw] bg-white p-5 rounded-xl shadow-xs border-2 border-[rgba(6,6,17,0.1)]">
          <h2 className="text-[rgba(6,6,17,0.6)] mb-5 text-2xl">Reservation History</h2>
          <div className="grid grid-cols-2">
            {data.last.map((e : any, i : any) =>
              renderReservation(e.time, e.workspaceName, e.floor, i)
            )}
          </div>
        </div>
      </div>
    </main>
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
    className="w-[20vw] h-[10vh] flex justify-center items-center flex-col rounded-3xl font-bold m-2 py-10"
    style={{ backgroundColor: bg }}
  >
    <h3>{title}</h3>
    <h4>{value}</h4>
  </div>
);

const renderReservation = (time: string, room: string, floor: string, key: number) => {
  return (
    <div className="m-2" key={key}>
      <div className="flex items-center">
        <div className="text-[rgba(74,166,89,1)] text-xl p-2 bg-[rgba(120,216,123,0.24)] w-fit m-2">
          <PiCalendarDotsFill />
        </div>
        <div>
          <h3>{formatDate(new Date())}</h3>
        </div>
      </div>
      <div className="flex">
        <div className="text-[rgba(74,166,89,1)] text-xl p-2 bg-[rgba(120,216,123,0.24)] w-fit m-2">
          <IoLocationSharp />
        </div>
        <div>
          <h3>{room}</h3>
          <h6 className="text-1x1 text-[rgba(6,6,17,0.6)]">{floor}</h6>
        </div>
      </div>
    </div>
  );
};
