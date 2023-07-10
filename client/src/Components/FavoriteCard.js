import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { userActions } from "../store/userSlice";
import "../styles/Home.css";
import { FavoriteHeart } from "../assets/heart";
import React from "react";

const FavoriteCard = (props) => {
  const { favorite } = props;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deleteFavorite = async () => {
    try {
      await axios
        .delete(`/home/favorites/${user.id}/${favorite.outlier_ref}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

      await axios
        .get(`/home/favorites/${user.id}`)
        .then((res) =>
          dispatch(userActions.setUser({ ...user, favorites: res.data }))
        )
        .then(() => console.log(user))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card-container">
      <div className="card-title">
        {favorite.team} <span className="card-info-text-small">vs</span>{" "}
        {favorite.opponent}
      </div>
      <div className="gradient-background-container">
        <div className="gradient-background">
          {" "}
          <span className="bet-type-text">{favorite.bet_type}</span>
        </div>
      </div>
      <div className="card-info-text">
        Average Line: {favorite.average_line}
      </div>
      <div className="outlier-container">
        <div className="outlier-inner-container">
          Outlier: {favorite.outlier_line}
        </div>
        <div className="outlier-inner-container">
          <div>
            <span>{favorite.bookmaker}</span>
          </div>
        </div>
      </div>

      <div
        onClick={() => {
          if (
            user.favorites.filter(
              (fav) => fav.outlier_ref === favorite.outlier_id
            ).length < 1
          ) {
          } else {
            deleteFavorite();
            console.log("supposed to delete");
          }
        }}
      >
        {
          <FavoriteHeart
            isFavorite={
              user.favorites.filter(
                (fav) => fav.outlier_ref === favorite.outlier_id
              ).length > 0
                ? true
                : false
            }
          />
        }
      </div>

      {/* <div style={{ display: "none" }} onClick={() => console.log(outlier)}>
        log outlier
      </div> */}
    </div>
  );
};

export default FavoriteCard;
