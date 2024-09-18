import React, { useEffect, useState } from "react";

type Action = 'UPDATE' | 'CREATE' | 'DELETE';

const App = () => {
  const [count, setCount] = useState(0);
  const [actionResponse, setActionResponse] = useState(null);
  
  const actions = ['UPDATE', 'CREATE', 'DELETE'];

  const changeCount = (countChange: number) => {
    setCount(count - countChange);
  };
  
  const handleAction = async (action: Action) => {
    console.log('ACTION', action);
    try {
      const RESTLET_ENDPOINT = '/app/site/hosting/restlet.nl?script=2266&deploy=1';
      const response = await fetch(RESTLET_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({ action, payload: { count } }),
      });
      
      const responseJson = await response.json();
      
      console.log('RESPONSE', responseJson);
      setActionResponse(responseJson.data);
    } catch (err: any) { 
      console.error(err);
    }
  }
  
  useEffect(() => {
    // Use setTimeout to update the response after 2000 milliseconds (2 seconds)
    if (!actionResponse) return;
    const timeoutId = setTimeout(() => {
      setActionResponse(null);
    }, 2000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [actionResponse]);

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
      <hr />
      <p>Example Actions</p>
      {actions.map(action => <button type="button" onClick={() => handleAction(action as Action)}>
        {action}
      </button>)}
      <p>Response</p>
      {actionResponse && <p>{actionResponse}</p>}
    </>
  );
};

export default App;