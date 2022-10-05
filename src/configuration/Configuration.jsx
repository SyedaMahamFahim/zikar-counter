import React from "react";
import { Routes, Route } from "react-router-dom";
import { Landing,Counter } from "../pages";
const Configuration = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/counter/:id" element={<Counter />} />
      </Routes>
    </>
  );
};

export default Configuration;
