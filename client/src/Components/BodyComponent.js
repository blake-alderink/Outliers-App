import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";
import { FiltersComponent } from "./FiltersComponent";
import { ListContainer } from "./ListContainer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";

export function BodyComponent() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    //need to run the get for the user again, but needs to be based on the authorization from the req.session
    axios
      .get("http://localhost:8000/users", { withCredentials: true })
      .then(async function (res) {
        if (res.data === false) {
          navigate("/");
        }

        const favorites = await axios.get(
          `http://localhost:8000/home/favorites/${res.data.user_id}`
        );

        dispatch(
          userActions.setUser({
            id: res.data.user_id,
            username: res.data.username,
            isLoggedIn: true,
            favorites: favorites.data,
          })
        );
      })
      .catch((err) => console.log(err));
  }, [dispatch]);
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
