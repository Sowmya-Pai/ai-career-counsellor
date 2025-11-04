import React from "react";

const ResultCard = ({ title, description }) => {
  return (
    <div className="border p-4 rounded shadow-md my-2">
      <h3 className="font-bold text-lg">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ResultCard;
