import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";
import { FiltersComponent } from "./FiltersComponent";
import { ListContainer } from "./ListContainer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import { outliersActions } from "../store/outliersSlice";
import "../styles/Home.css";
import { LoadBettingData } from "./LoadBettingData";
import LoadOutlierData from "./LoadOutlierData";

export function BodyComponent() {
  const user = useSelector((state) => state.user);
  const outliers = useSelector((state) => state.outliers.outliersList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const getOutliersData = async () => {
      const outliersList = await axios.get("/outliers").then((res) => res.data);
      console.log("useeffect ran");
      dispatch(outliersActions.addOutliers(outliersList));
    };
    if (outliers.length === 0) getOutliersData();

    //need to run the get for the user again, but needs to be based on the authorization from the req.session
    axios
      .get("/users", { withCredentials: true })
      .then(async function (res) {
        if (res.data === false) {
          navigate("/");
        }

        const favorites = await axios.get(
          `/home/favorites/${res.data.user_id}`
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
      <div className="body-style">
        <NavBar />
        <FiltersComponent />
        <LoadBettingData />
        <LoadOutlierData />
        <div className="card-lists-section">
          <Outlet />
        </div>
      </div>
    </>
  );
}
