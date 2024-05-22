import Search from "./Search";
import Employee from "./Employee";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_SOCKS_API_URL);

        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const json_response = await response.json();
        setData(json_response); // assign JSON response to the data variable.
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>JJ SOLUTIONS EMPLOYEE DIRECTORY</h1>
      <Search />

      {data.map((employee) => (
        <Employee key={employee._id} data={employee} />
      ))}
    </div>
  );
};

export default Home;