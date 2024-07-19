import React, { useEffect, useState } from "react";

const App2 = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  // fetch("https://jsonplaceholder.typicode.com/users")
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Network response was not okay.");
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     setUsers(data);
  //     setLoading(false);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching data:", error);
  //     setLoading(false);
  //   });
  //   }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error("Network response was not okay.");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h1>User List</h1>
      {users.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>User not Found</p>
      )}
    </div>
  );
};

export default App2;
