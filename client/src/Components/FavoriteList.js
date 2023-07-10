import { useSelector } from "react-redux";
import FavoriteCard from "./FavoriteCard";
import "../styles/Home.css";

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
      {favorites.length === 0 ? (
        <div style={{ fontStyle: "italic" }}>No favorites to show </div>
      ) : (
        ""
      )}
      <div className="cards-list-container">
        {(isFiltered ? filteredFavorites : favorites).map((fav) => {
          return <FavoriteCard favorite={fav} />;
        })}
      </div>
    </div>
  );
};

export default FavoriteList;
