import React from "react";

interface cardProps {
    title: string;
    department: string;
    team: string;
    author: string;
    date: string;
    onClick: () => void; 
}

export default function card({ title, department, team, author, date, onClick }: cardProps) {
    return (
        <div className="bg-white w-72 p-5 rounded-lg shadow-md cursor-pointer" onClick={onClick}>
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <p className="text-sm text-gray-600"><span className="font-bold text-black">Department</span><br />{department}</p>
            <p className="text-sm text-gray-600"><span className="font-bold text-black">Team</span><br />{team}</p>
            <p className="text-sm text-gray-600"><span className="font-bold text-black">By:</span> {author}</p>
            <p className="text-sm text-gray-600"><span className="font-bold text-black">Date</span><br />{date}</p>
            <div className="mt-4 flex gap-4">
                <a href="#" className="text-purple-600 font-bold cursor-pointer hover:underline">Accept Booking</a>
                <a href="#" className="text-gray-600 cursor-pointer hover:underline">Decline</a>
            </div>
        </div>
    );
}