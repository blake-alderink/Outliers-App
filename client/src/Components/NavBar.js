import { Link, Outlet, useNavigate } from "react-router-dom";
import { ListChoose } from "./ListChoose";
import { useSelector } from "react-redux";
import { userActions } from "../store/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../styles/NavBar.css";

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
      <div className="nav-bar-container">
        <div className="logout-button-container">
          <button onClick={() => logoutUser()} className="logout-button">
            Logout
          </button>
        </div>
        <div className="nav-bar-content-container">
          <div className="nav-content">
            <h2>Outliers</h2>
          </div>
        </div>
      </div>
      <div className="list-toggle-menu-container">
        <div className="list-toggle-menu">
          <ListChoose />
        </div>
      </div>
      {/* <Outlet /> */}
    </>
  );
}
