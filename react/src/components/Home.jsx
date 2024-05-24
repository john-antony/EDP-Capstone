import Search from "./Search";
import Employee from "./Employee";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import "../styles/Home.css";

const Home = () => {
  const { user, fetchUser, logout } = useAuth();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchUser();
  }, []);

  const handlelogout = async (e) => {
    e.preventDefault();
    await logout();
    console.log("Logged Out!");
    navigate("/");
  };

  return (
    <div className="home-cont">
      <h1>JJ SOLUTIONS EMPLOYEE DIRECTORY</h1>
      <div className="menu-btns">
        <Link to="/profile">
          <button className="search-btn" type="submit">
            Profile
          </button>
        </Link>
        <Link to="/predict">
          <button className="search-btn" type="submit">
            Predict
          </button>
        </Link>

        <button className="search-btn" type="submit" onClick={handlelogout}>
          Log Out
        </button>
      </div>
      <Search setData={setData} />
      <div
        className="home-c-cont"
        style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
      >
        {data.map((employee) => (
          <Employee key={employee._id} data={employee} />
        ))}
      </div>
    </div>
  );
};

export default Home;
