import React, { useState, useEffect } from "react";
import apiRequest from "./apiRequest";

const App3 = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPizzas = async (signal) => {
    try {
      const errMsg = await apiRequest("https://localhost:3500/items");
      if (errMsg) {
        throw new Error(errMsg);
      }

      const response = await fetch("https://localhost:3500/items", { signal });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error.message);
        console.error("Error fetching", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchPizzas(signal);

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Pizza List</h1>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza.id}>{pizza.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App3;
