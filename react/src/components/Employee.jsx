import React from "react";

const Employee = (props) => {
  return (
    <div
      className="card"
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
        <div className="card-text">Salary: {props.data?.salary}</div>
      </div>
      <div
        className="card-footer"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <button
          className="btn btn-sm btn-danger"
          onClick={() => props.handleDelete(props.data._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Employee;
