import { useSelector } from "react-redux";
import FavoriteCard from "./FavoriteCard";

const FavoriteList = () => {
  const user = useSelector((state) => state.user);
  const filters = useSelector((state) => state.filters);
  const favorites = user.favorites;
  const filteredFavorites = favorites.filter(
    (fav) =>
      filters.betTypes.includes(fav.bet_type) &&
      filters.teams.includes(fav.team)
  );
  const isFiltered = useSelector((state) => state.outliers.isFiltered);

  return (
    <div>
      <h1>This is {user.username} Favorites List</h1>
      <button onClick={() => console.log(filteredFavorites, filters)}>
        console log filtered Favorites
      </button>
      <h2>{/* {user.favorites[0] ? user.favorites[0].team : ""} */}</h2>
      {(isFiltered ? filteredFavorites : favorites).map((fav) => {
        return <FavoriteCard favorite={fav} />;
      })}
    </div>
  );
};

export default FavoriteList;
