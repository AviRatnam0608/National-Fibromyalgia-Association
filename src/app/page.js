import React from "react";
import NavBar from "./components/NavBar/ResearcherNavBar";
import Dashboard from "../../pages/admin-dashboard";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="mx-5">
        <Dashboard />
      </div>
    </>
  );
}
