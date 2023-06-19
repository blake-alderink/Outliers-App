import { Link, Outlet } from "react-router-dom";

export function ListChoose() {
  return (
    <>
      <Link to="outliers">Outliers </Link>
      <Link to="favorites">Favorites </Link>
      {/* <Outlet /> */}
    </>
  );
}
