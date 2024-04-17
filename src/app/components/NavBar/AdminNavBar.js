"use client";

import { NavBarContainer } from "./NavBar.styles";
import { useEffect, useState } from "react";

function ResearcherNavBar() {
  // State to hold the current path
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Function to update the current path
  useEffect(() => {
    const updatePath = () => {
      if (window !== undefined) {
        setCurrentPath(window.location.pathname);
      }
    };
    window.addEventListener("popstate", updatePath);
    return () => {
      window.removeEventListener("popstate", updatePath);
    };
  }, []);

  // Function to determine if a tab is active
  const isActive = (path) => {
    return currentPath === path ? true : false;
  };

  return (
    <nav className={NavBarContainer}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">National Fibromyalgia Association</h1>
        <div>
          <a
            href="/login"
            className={`px-4 hover:underline ${
              isActive("/login") ? "active: underline" : ""
            }`}
          >
            Login
          </a>
          <a
            href="/admin-dashboard"
            className={`px-4 hover:underline ${
              isActive("/admin-dashboard") ? "active: underline" : ""
            }`}
          >
            Dashboard
          </a>
          <a
            href="/admin-past-studies"
            className={`px-4 hover:underline ${
              isActive("/admin-past-studies") ? "active: underline" : ""
            }`}
          >
            Archive
          </a>
          <a
            href="/admin-pending"
            className={`px-2 
            hover:bg-primary 
            hover:text-white
            hover:shadow-lg
            bg-white border border-2 text-primary rounded-lg py-1 ${
              isActive("/admin-pending") ? "active: underline" : ""
            }`}
          >
            Pending Studies
          </a>
        </div>
      </div>
    </nav>
  );
}

export default ResearcherNavBar;
