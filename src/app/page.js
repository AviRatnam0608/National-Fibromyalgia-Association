import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Dashboard from "../../pages/Dashboard";

export default function Home() {
  return (
    <React.Fragment>
      <NavBar />
      <Dashboard />
    </React.Fragment>
  );
}
