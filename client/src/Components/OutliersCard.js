import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";

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

  return (
    <div>
      <h1>{outlier.team}</h1>
      <h3>{outlier.outlier_id}</h3>
      <button
        onClick={() => addFavorite()}
        disabled={
          user.favorites.filter((fav) => fav.outlier_id === outlier.outlier_id)
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
