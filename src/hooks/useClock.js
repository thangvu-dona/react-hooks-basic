import { useEffect, useState } from 'react';

function formatDate(date) {
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);

  return `${hours}:${minutes}:${seconds}`;
}

// Custom Hook
// can use other hooks
// separate Logic and UI
function useClock() {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const clockIntervalId = setInterval(() => {
      const now = new Date();
      // HH:mm:ss
      const newTimeString = formatDate(now);

      setTimeString(newTimeString);
    }, 1000);

    return () => {
      // cleanup
      console.log('Clock cleanup!');
      clearInterval(clockIntervalId);
    };
  }, []);

  return { timeString };
}

export default useClock;