import { Link, Outlet, NavLink } from "react-router-dom";
import "../styles/NavBar.css";
import { useState } from "react";

export function ListChoose() {
  const [activeList, setActiveList] = useState("outliers");

  const activeHandler = (selector) => {
    setActiveList(selector);
  };

  return (
    <>
      <NavLink
        onClick={() => activeHandler("outliers")}
        to="outliers"
        className="list-toggle-menu-item"
      >
        Outliers{" "}
      </NavLink>
      <NavLink
        onClick={() => activeHandler("favorites")}
        to="favorites"
        className="list-toggle-menu-item"
      >
        Favorites{" "}
      </NavLink>
      {/* <Outlet /> */}
    </>
  );
}
