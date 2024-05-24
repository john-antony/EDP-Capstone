import React from "react";
import { useAuth } from "../hooks/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import "../styles/Profile.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handlelogout = async (e) => {
    e.preventDefault();
    await logout();
    console.log("Logged Out!");
    navigate("/");
  };
  return (
    <div className="prof-cont">
      <h1>{user.userobj.name}</h1>
      <div className="menu-btns">
        <Link to="/home">
          <button className="search-btn" type="submit">
            Home
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
      <div
        className="e-card"
        style={{ flex: "1", minWidth: "300px", maxWidth: "45%" }}
      >
        <div className="card-body">
          <h5 className="card-title">Employee Details</h5>
          <div className="card-text">Name: {user.userobj?.name}</div>
          <div className="card-text">
            Manager Id: {user.userobj?.manager_id}
          </div>
          <div className="card-text">Job Role: {user.userobj?.job_role}</div>
          <div className="card-text">
            Work Location: {user.userobj?.work_location}
          </div>
          <div className="card-text">
            Phone Number: {user.userobj?.phone_number}
          </div>

          <div className="card-text">
            Salary: $
            {user.userobj?.salary
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
