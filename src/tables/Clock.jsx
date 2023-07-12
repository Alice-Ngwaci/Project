import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

    let day = time.getDate();
    let month = time.getMonth() + 1;
    let year = time.getFullYear();

    let currentDate = `${day}-${month}-${year}`;


  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='mt-3 text-info' style={{fontWeight: 'bold'}}>
      <h1>Current Time</h1>
      <p>{time.toLocaleTimeString()}</p>
      <h1 className="mt-3">Current Date</h1>
      <p>{currentDate}</p>
    </div>
  );
}

export default Clock;
