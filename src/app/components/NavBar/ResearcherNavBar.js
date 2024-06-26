"use client";

import { NavBarContainer, activeStyling, hoverStyling } from "./NavBar.styles";
import { useEffect, useState } from "react";
import LogoutButton from "../LogoutButton";
import { useAuth } from "@/app/services/AuthContext";

function ResearcherNavBar() {
  const { currentUser, loading } = useAuth();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

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

  const isActive = (path) => {
    return currentPath === path ? true : false;
  };

  return (
    <nav className={NavBarContainer}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">National Fibromyalgia Association</h1>
        <div>
          {!currentUser && (
            <a
              href="/login"
              className={`px-2 ${hoverStyling} ${
                isActive("/login") ? activeStyling : ""
              }`}
            >
              Login
            </a>
          )}
          <a
            href="/dashboard"
            className={`px-2 ${hoverStyling} ${
              isActive("/dashboard") ? activeStyling : ""
            }`}
          >
            Home
          </a>
          <a
            href="/researcher-pending"
            className={`px-2 ${hoverStyling} ${
              isActive("/researcher-pending") ? activeStyling : ""
            }`}
          >
            Pending
          </a>
          <a
            href="/rpr-form"
            className={`px-2 
              hover:bg-primary 
              hover:text-white
              hover:shadow-lg
              border border-2 text-primary rounded-lg py-1 ${
                isActive("/rpr-form")
                  ? "active: bg-primaryDarker text-white"
                  : "bg-white"
              }
              `}
          >
            New Post
          </a>
          {currentUser && <LogoutButton />}
        </div>
      </div>
    </nav>
  );
}

export default ResearcherNavBar;
