import { useSelector } from "react-redux";

const FavoriteCard = (props) => {
  const { favorite } = props;

  return (
    <div>
      <h4>Favorite Card</h4>
      <h3>
        {favorite.team} vs {favorite.opponent}
      </h3>
      <h4>{favorite.outlier_id}</h4>
    </div>
  );
};

export default FavoriteCard;
