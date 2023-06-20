import { Link, Outlet } from "react-router-dom";
import { ListChoose } from "./ListChoose";
import { useSelector } from "react-redux";

export function NavBar() {
  const user = useSelector((state) => state.user);

  const logUser = () => {
    console.log(user);
  };

  return (
    <>
      <h1>this is the nav bar</h1>
      <button onClick={() => logUser()}>console log state</button>
      <ListChoose />
      {/* <Outlet /> */}
    </>
  );
}
