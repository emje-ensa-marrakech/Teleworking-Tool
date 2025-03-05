import React from "react";

interface CardProps {
  title: string;
  department: string;
  team: string;
  author: string;
  date: string;
  onClick: () => void;
  onConfirmChange: (id: number, confirmed: boolean) => void;
  confirmed: boolean;
  id: number;
}

export default function Card({
  title,
  department,
  team,
  author,
  date,
  onClick,
  onConfirmChange,
  confirmed,
  id,
}: CardProps) {
  return (
    <div className="card bg-gray-100" onClick={onClick}>
      <h2 className="title">{title}</h2>
      <div className="info1">
        <p>
          <span className="bold">Department</span>
          {department}
        </p>
        <p>
          <span className="bold">Team</span>
          {team}
        </p>
      </div>
      <div className="info2">
        <p>
          <span className="bold">By:</span> {author}
        </p>
        <p>
          <span className="bold">Date</span>
          {date}
        </p>
      </div>
      <div className="actions">
        <div className="actions">
          {confirmed === false ? (
            <>
    <p className={'font-bold p-2.5 rounded text-center text-red-600 bg-red-100'}>Declined ❌</p>
              <button
                className="accept"
                onClick={(e) => {
                  e.stopPropagation();
                  onConfirmChange(id, true);
                }}
                disabled={confirmed} // Disable if already accepted
              >
                Accept Booking
              </button>
                
              
            </>
          ) : (
            <>
              <p className={'font-bold p-2.5 rounded text-center text-green-600 bg-green-100'}>Accepted ✅</p>
              <button
                className="decline"
                onClick={(e) => {
                  e.stopPropagation();
                  onConfirmChange(id, false);
                }}
                disabled={!confirmed} // Disable if already declined
              >
                Decline
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
