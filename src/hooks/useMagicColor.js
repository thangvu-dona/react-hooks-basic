import { useEffect, useRef, useState } from 'react';

function getRandomColor(currentColor) {
  const COLOR_LIST = ["deeppink", "green", "yellow", "black", "blue"];
  const currentIndex = COLOR_LIST.indexOf(currentColor);

  let newIndex = currentIndex;
  while (newIndex === currentIndex) {
    newIndex = Math.trunc(Math.random() * COLOR_LIST.length);
  }

  return COLOR_LIST[newIndex];
}

function useMagicColor() {
  const [color, setColor] = useState('transparent');
  const colorRef = useRef('transparent');

  // Change color every 1 second
  useEffect(() => {
    const colorInterval = setInterval(() => {
      // console.log('First color - init color: ', color);
      // console.log('Change color - colorRef: ', colorRef.current);
      const newColor = getRandomColor(colorRef.current);
      setColor(newColor);

      colorRef.current = newColor;
    }, 1000);

    return () => {
      // cleanup
      clearInterval(colorInterval);
    }
  }, []);

  return color;
}

export default useMagicColor;