import React, { useState } from "react";

const Prediction = () => {
  // State to manage loading state
  const [isLoading, setIsloading] = useState(false);
  const work_locations = [
    "Hartford, CT",
    "West Hartford, CT",
    "Newington, CT",
    "South Windsor, CT",
    "New Haven, CT",
    "Norwalk, CT",
    "Manhattan, NY",
    "Brooklyn, NY",
    "Bronx, NY",
    "Queens, NY",
    "St Paul, MN",
    "Chicago, IL",
    "Atlanta, GA",
    "Los Angeles, CA",
    "Austin, TX",
  ];
  // State to manage form data
  const [formData, setFormData] = useState({
    job_role: "",
    work_location: "",
  });
  const handlePredictClick = () => {
    const url = `${import.meta.env.VITE_FLASK_API_URL}/predict`;
    setIsloading(true);
    const jsonData = JSON.stringify(formData);

    // Fetch request to the Flask backend
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: jsonData,
    })
      .then((response) => response.json())
      .then((response) => {
        setResult(response.Prediction);
        setIsloading(false);
        setShowSpan(true);
      });
  };

  // State to manage prediction result
  const [result, setResult] = useState("");
  // State to manage displaying result
  const [showSpan, setShowSpan] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    let inputData = { ...formData };
    inputData[name] = value;
    setFormData(inputData);
  };
  return (
    <div>
      <form method="post" acceptCharset="utf-8" name="Modelform">
        <div className="form-group">
          <label>
            <b>Select the Job Role:</b>
          </label>
          <br />
          <select
            className="selectpicker form-control"
            id="job_role"
            name="job_role"
            value={formData.job_role}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select
            </option>
            <option value="job_role_Employee">Employee</option>
            <option value="job_role_Manager">Manager</option>
            <option value="job_role_HR">HR</option>
          </select>
        </div>
        <div className="form-group">
          <label>
            <b>Select the Work Location:</b>
          </label>
          <br />
          <select
            className="selectpicker form-control"
            id="work_location"
            name="work_location"
            value={formData.work_location}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select
            </option>
            {work_locations.map((work_loc) => (
              <option value={`work_location_${work_loc}`}>{work_loc}</option>
            ))}
          </select>
        </div>
        <div className="form-group mt-3">
          <button
            className="btn btn-primary form-control"
            disabled={isLoading}
            onClick={!isLoading ? handlePredictClick : null}
          >
            Predict Selling Price
          </button>
        </div>
      </form>
      <br />
      <div className="text-center">
        <h4>
          {showSpan && (
            <span id="prediction">
              {result && Object.keys(result).length !== 0 ? (
                <p>
                  The Predicted Salary is Salary: $
                  {result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              ) : (
                <p>Please fill out each field in the form completely</p>
              )}
            </span>
          )}
        </h4>
      </div>
    </div>
  );
};

export default Prediction;
