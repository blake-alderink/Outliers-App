import { Link, Outlet } from "react-router-dom";
import "../styles/NavBar.css";

export function ListChoose() {
  return (
    <>
      <Link to="outliers" className="list-toggle-menu-item">
        Outliers{" "}
      </Link>
      <Link to="favorites" className="list-toggle-menu-item">
        Favorites{" "}
      </Link>
      {/* <Outlet /> */}
    </>
  );
}
