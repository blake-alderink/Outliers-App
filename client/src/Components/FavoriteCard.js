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
        .delete(
          `http://localhost:8000/home/favorites/${user.id}/${favorite.outlier_ref}`
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

      await axios
        .get(`http://localhost:8000/home/favorites/${user.id}`)
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
      <h4>Favorite Card</h4>
      <div onClick={() => deleteFavorite()}>
        {<FavoriteHeart isFavorite={true} />}
      </div>
      <h3>
        {favorite.team} vs {favorite.opponent}
      </h3>
      <h4>{favorite.outlier_id}</h4>
      <h2>{favorite.bet_type}</h2>
      <button onClick={() => deleteFavorite()}>Remove From Favorites</button>
    </div>
  );
};

export default FavoriteCard;
