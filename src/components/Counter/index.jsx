import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./Counter.scss";

Counter.propTypes = {};

function Counter(props) {
  // step 1
  const [count, setCount] = useState(0);
  const prevCount = useRef(count);

  // step 3
  useEffect(() => {
    prevCount.current = count;
  }, [count]);

  const handleIncreaseClick = () => {
    setCount((x) => x + 1);
  };

  // step 2
  return (
    <div className="counter-container">
      <p>Previous: {prevCount.current}</p>
      <p>Current: {count}</p>

      <div>
        <button onClick={handleIncreaseClick}>Increase</button>
      </div>
    </div>
  );
}

export default Counter;
