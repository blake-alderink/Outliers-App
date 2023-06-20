import { useSelector } from "react-redux";
import FavoriteCard from "./FavoriteCard";

const FavoriteList = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1>This is {user.username} Favorites List</h1>
      <h2>{/* {user.favorites[0] ? user.favorites[0].team : ""} */}</h2>
      {user.favorites.map((fav) => {
        return <FavoriteCard favorite={fav} />;
      })}
    </div>
  );
};

export default FavoriteList;
