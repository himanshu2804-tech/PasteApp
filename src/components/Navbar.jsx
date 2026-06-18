import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="flex flex-row gap-4 place-content-evenly">
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/pastes"}>Paste</NavLink>
      <button
        className="theme-toggle"
        onClick={() => setDark((d) => !d)}
        title={dark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {dark ? "☀️" : "🌙"}
      </button>
    </div>
  );
};

export default Navbar;
