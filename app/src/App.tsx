import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const changeCount = (countChange: number) => {
    setCount(count - countChange);
  };

  return (
    <>
      <h1>Counter</h1>
      <p>{count}</p>
      <button type="button" onClick={() => changeCount(-1)}>
        Increment
      </button>
      <button type="button" onClick={() => changeCount(1)}>
        Decrement
      </button>
    </>
  );
};

export default App;