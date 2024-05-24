import React from "react";
import { useAuth } from "../hooks/AuthContext";
import "../styles/Employee.css";
const Employee = (props) => {
  const { user } = useAuth();
  return (
    <div
      className="e-card"
      style={{ flex: "1", minWidth: "300px", maxWidth: "45%" }}
    >
      <div className="card-body">
        <h5 className="card-title">Employee Details</h5>
        <div className="card-text">Name: {props.data?.name}</div>
        <div className="card-text">Manager Id: {props.data?.manager_id}</div>
        <div className="card-text">Job Role: {props.data?.job_role}</div>
        <div className="card-text">
          Work Location: {props.data?.work_location}
        </div>
        <div className="card-text">
          Phone Number: {props.data?.phone_number}
        </div>

        {user.userobj.job_role == "HR" ||
        (user.userobj.job_role == "Manager" &&
          user.userobj.manager_id == props.data?.manager_id) ? (
          <div className="card-text">
            Salary: $
            {props.data?.salary
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
        ) : (
          <div className="card-text">Salary: UNAUTHORIZED</div>
        )}
      </div>
      <div
        className="card-footer"
        style={{ display: "flex", justifyContent: "space-between" }}
      ></div>
    </div>
  );
};

export default Employee;
