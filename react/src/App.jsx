import { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Prediction from "./components/Prediction";

import RequireAuth from "./components/RequireAuth";
import { AuthProvider } from "./hooks/AuthContext";
import "./App.css";
// import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="/predict" element={<Prediction />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
