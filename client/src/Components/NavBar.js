import { Link, Outlet, useNavigate } from "react-router-dom";
import { ListChoose } from "./ListChoose";
import { useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

export function NavBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logUser = () => {
    console.log(user);
  };

  const logoutUser = async () => {
    await axios
      .post("http://localhost:8000/users/logout", "")
      .then((res) => console.log(res.data));
    dispatch(userActions.resetState());
    navigate("/");
  };

  return (
    <>
      <button onClick={() => logoutUser()}>Logout</button>
      <h1>this is the nav bar</h1>
      <button onClick={() => logUser()}>console log state</button>
      <ListChoose />
      {/* <Outlet /> */}
    </>
  );
}
