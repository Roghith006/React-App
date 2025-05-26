import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    if (count < 25) {
      setCount(prevCount => prevCount + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    }
  };

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button id='btn1' onClick={decrement}>
        Subtract
      </button>
      <button id='btn2' onClick={increment}>
        Addition
      </button>
    </div>
  );
}

export default Counter;
