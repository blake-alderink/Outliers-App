import { Routes, Route, Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { FiltersComponent } from "./FiltersComponent";
import { ListContainer } from "./ListContainer";

export function BodyComponent() {
  return (
    <>
      <div style={{ backgroundColor: "red" }}>
        <NavBar />
        <Outlet />
      </div>

      <FiltersComponent />
    </>
  );
}
