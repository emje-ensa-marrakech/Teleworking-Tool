"use client";

import { Header } from "@/app/components/collabHeader";
import { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { PiCalendarDotsFill } from "react-icons/pi";

export default function page() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const id = localStorage.getItem("id") || sessionStorage.getItem("id");
    fetch("/api/collab/getStats?id=" + id, {
      headers: {
        Authorization: token!,
        "Content-Type": "application/json",
      },
    }).then((e) => {
      e.json().then((d) => {
        console.log(d);
        setData(d);
      });
    });
  }, []);

  return !data ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
    <>
      {Header(data["name"])}

      <main className="h-[100%] flex flex-col justify-between p-2">
        <div className="grid grid-cols-3 gap-4 m-5">
          <div className="bg-[rgba(120,216,123,0.44)] w-[20vw] h-[10vh] flex justify-center items-center flex-col rounded-2xl font-bold">
            <h3> Total Bookings :</h3>
            <h4>{data["total"]}</h4>
          </div>

          <div className="bg-[rgba(180,244,217,1)] w-[20vw] h-[10vh] flex justify-center items-center flex-col rounded-2xl font-bold">
            <h3> Available Spaces :</h3>
            <h4>{data["available"]}</h4>
          </div>

          <div className="bg-[rgba(146,223,213,1)] w-[20vw] h-[10vh] flex justify-center items-center flex-col rounded-2xl font-bold">
            <h3> your bookings :</h3>
            <h4>{data["yours"]}</h4>
          </div>
        </div>

        <div className="flex justify-end items-end ">
          <div className="w-[50vw] bg-white p-5 rounded-xl shadow-xs border-2 border-[rgba(6,6,17,0.1)]">
            <h1 className="text-[rgba(6,6,17,0.6)] mb-5">
              Reservation History
            </h1>
            <div className="grid grid-cols-2">
              {data["last"].map((e: any) => ss(e.time, e.room, e.floor))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const ss = (time: any, room: any, floor: any) => {
  return (
    <div className="m-2">
      {" "}
      <div className="flex justify-center items-center flex-row">
        <div className="text-[rgba(74,166,89,1)] text-xl p-2  bg-[rgba(120,216,123,0.24)] w-fit m-2">
          <PiCalendarDotsFill />
        </div>
        <div>
          <h3>{time}</h3>
        </div>
      </div>
      <div className="flex ">
        <div className="text-[rgba(74,166,89,1)] text-xl p-2  bg-[rgba(120,216,123,0.24)] w-fit m-2">
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
