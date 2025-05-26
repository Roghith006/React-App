import React, { useState } from 'react';



function Blogpage() {
  const [message, setmessage] = useState("Default Message");

  function updateme() {
    setmessage("This is home page.");
  }

  return (
    <div>
    <a href='#'onClick={updateme}>Blog page</a>
    <p>{message}</p>
    </div>
  );
}

export default Blogpage;