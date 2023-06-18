import React, { useState, useEffect } from 'react';

const DateTimeComponent = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const formatDate = (date) => {
    // Format the date as desired (e.g., "yyyy-mm-dd")
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date) => {
    // Format the time as desired (e.g., "hh:mm:ss AM/PM")
    let hours = date.getHours();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };

  return (
    <div>
      <div>Time: {formatTime(currentDateTime)} (IST)</div>
      <div>Date: {formatDate(currentDateTime)}</div>
       
    </div>
  );
};

export default DateTimeComponent;
