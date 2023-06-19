import { Routes, Route, Outlet } from "react-router-dom";
import OutliersList from "./OutliersList";
import FavoriteList from "./FavoriteList";

export function ListContainer() {
  return (
    <>
      <h3>List Container</h3>
      <Routes>
        <Route path="outliers" element={<OutliersList />} />
        <Route path="favorites" element={<FavoriteList />} />
      </Routes>
      <Outlet />
    </>
  );
}
