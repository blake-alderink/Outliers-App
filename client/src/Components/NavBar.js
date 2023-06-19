import { Link, Outlet } from "react-router-dom";
import { ListChoose } from "./ListChoose";

export function NavBar() {
  return (
    <>
      <h1>this is the nav bar</h1>
      <ListChoose />
      {/* <Outlet /> */}
    </>
  );
}
