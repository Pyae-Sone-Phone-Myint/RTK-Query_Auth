import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Routeguard from "../components/Routeguard";

const Path = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Routeguard>
              <Dashboard />
            </Routeguard>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default Path;
