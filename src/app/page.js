import React from "react";
import Dashboard from "../../pages/dashboard";
import NavBar from "./components/NavBar/NavBar";

export default function Home() {
  return (
    <React.Fragment>
      <NavBar />
      <Dashboard />
    </React.Fragment>
  );
}
