import React, { useState, useEffect } from "react";

let eventSource;

const TestSSE = () => {
  const [isSSEOpen, setIsSSEOpen] = useState(false);
  const [list, setList] = useState([]);

  const openSSE = () => {
    eventSource = new EventSource("http://localhost:4000/stock-price");

    eventSource.addEventListener("noey", (ev) => {
      const number = JSON.parse(ev.data);
      setList((prev) => [...prev, number]);
    });

    eventSource.addEventListener("m", (ev) => {
      setList((prev) => [...prev, ev.data]);
    });

    eventSource.onerror = (error) => {
      console.error("Error:", error);
      stopSSE();
    };

    setIsSSEOpen(true);
  };

  const stopSSE = () => {
    if (eventSource && eventSource.readyState !== EventSource.CLOSED) {
      eventSource.close();
      setIsSSEOpen(false);
    }
  };

  useEffect(() => {
    return () => {
      if (eventSource && eventSource.readyState !== EventSource.CLOSED) {
        eventSource.close();
      }
    };
  }, []);

  return (
    <>
      <div>Test SSE React</div>
      <div>{isSSEOpen ? "Connected" : "Closed"}</div>
      <div style={{ display: "flex", padding: "10px", gap: "5px" }}>
        <button onClick={openSSE} disabled={isSSEOpen}>
          Connect
        </button>
        <button onClick={stopSSE} disabled={!isSSEOpen}>
          Close
        </button>
      </div>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default TestSSE;
