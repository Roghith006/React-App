import React, { useState } from 'react';



function MyButton() {
  const [message, setmessage] = useState("I am learning React");

  function updateme() {
    setmessage("I am learning React and hooks as well");
  }

  return (
    <div>
    <button onClick={updateme}>update me</button>
    <p>{message}</p>
    </div>
  );
}

export default MyButton;