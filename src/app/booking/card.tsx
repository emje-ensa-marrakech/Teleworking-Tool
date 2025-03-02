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
        <div className="card" onClick={onClick}>
            <h2 className="title">{title}</h2>
            <div className="info1">
                <p ><span className="bold">Department</span>{department}</p>
                <p ><span className="bold">Team</span>{team}</p>
            </div>
            <div className="info2">
                <p ><span className="bold">By:</span> {author}</p>
                <p ><span className="bold">Date</span>{date}</p>
            </div>
            <div className="actions">
                <button  className="accept">Accept Booking</button>
                <button  className="decline">Decline</button>
            </div>
        </div>
    );
}
