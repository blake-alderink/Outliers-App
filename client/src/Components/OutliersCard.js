import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import "../styles/Home.css";
import { FavoriteHeart } from "../assets/heart";
import { bettingLinks } from "../functions/bettinglinks";

const OutliersCard = (props) => {
  const user = useSelector((state) => state.user);
  const outlier = props.outlier;
  const dispatch = useDispatch();
  const database_url = process.env.REACT_APP_API_URI;

  const addFavorite = async () => {
    try {
      await axios
        .post(`${database_url}/home/favorites/${user.id}/${outlier.outlier_id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      await axios
        .get(`${database_url}/home/favorites/${user.id}`)
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
          `${database_url}/home/favorites/${user.id}/${outlier.outlier_id}`
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

      await axios
        .get(`${database_url}/home/favorites/${user.id}`)
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
        {outlier.team} <span className="card-info-text-small">vs</span>{" "}
        {outlier.opponent}
      </div>
      <div className="gradient-background-container">
        <div className="gradient-background">
          {" "}
          <span className="bet-type-text">{outlier.bet_type}</span>
        </div>
      </div>
      <div className="card-info-text">Average Line: {outlier.average_line}</div>
      <div className="card-info-text"> Sport: {outlier.sport}</div>
      <div
        className="outlier-container"
        onClick={() => window.open(bettingLinks(outlier.bookmaker), "_blank")}
      >
        <div className="outlier-inner-container">
          Outlier: {outlier.outlier_line}
        </div>
        <div className="outlier-inner-container">
          <div>
            <span>{outlier.bookmaker}</span>
          </div>
        </div>
      </div>

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

      {/* <div style={{ display: "none" }} onClick={() => console.log(outlier)}>
        log outlier
      </div> */}
    </div>
  );
};

export default OutliersCard;
