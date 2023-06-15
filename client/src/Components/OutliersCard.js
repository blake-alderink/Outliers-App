const OutliersCard = (props) => {
  const outlier = props.outlier;

  return (
    <div>
      <h1>{outlier.team}</h1>
    </div>
  );
};

export default OutliersCard;
