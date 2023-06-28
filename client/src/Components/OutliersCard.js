import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import "../styles/Home.css";
import { FavoriteHeart } from "../assets/heart";

const OutliersCard = (props) => {
  const user = useSelector((state) => state.user);
  const outlier = props.outlier;
  const dispatch = useDispatch();

  const addFavorite = async () => {
    try {
      await axios
        .post(
          `http://localhost:8000/home/favorites/${user.id}/${outlier.outlier_id}`
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      await axios
        .get(`http://localhost:8000/home/favorites/${user.id}`)
        .then((res) =>
          dispatch(userActions.setUser({ ...user, favorites: res.data }))
        )
        .then(() => console.log(user))
        .catch((err) => console.log(err));
    } catch (error) {}
  };

  const deleteFavorite = async () => {
    try {
      await axios
        .delete(
          `http://localhost:8000/home/favorites/${user.id}/${outlier.outlier_id}`
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
      <div
        onClick={() => {
          if (
            user.favorites.filter(
              (fav) => fav.outlier_ref === outlier.outlier_id
            ).length < 1
          ) {
            addFavorite();
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
                (fav) => fav.outlier_ref === outlier.outlier_id
              ).length > 0
                ? true
                : false
            }
          />
        }
      </div>
      <div className="card-title">
        {outlier.team} <span className="card-info-text">vs</span>{" "}
        {outlier.opponent}
      </div>
      <h3>{outlier.outlier_id}</h3>
      <h2>{outlier.bet_type}</h2>
      <button
        onClick={() => addFavorite()}
        disabled={
          user.favorites.filter((fav) => fav.outlier_ref === outlier.outlier_id)
            .length > 0
            ? true
            : false
        }
      >
        Add To Favorites
      </button>
    </div>
  );
};

export default OutliersCard;
