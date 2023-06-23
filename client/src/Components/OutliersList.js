import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { outliersActions } from "../store/outliersSlice";
import { useEffect } from "react";
import OutliersCard from "./OutliersCard";

const OutliersList = () => {
  const dispatch = useDispatch();
  const outliers = useSelector((state) => state.outliers.outliersList);
  const filters = useSelector((state) => state.filters);
  const isFiltered = useSelector((state) => state.outliers.isFiltered);

  useEffect(() => {
    //on load of component, set state to the database. Then we can map the outliers down below in the jsx
    const getOutliersData = async () => {
      const outliersList = await axios
        .get("http://localhost:8000/outliers")
        .then((res) => res.data);
      console.log("useeffect ran");
      dispatch(outliersActions.addOutliers(outliersList));
    };
    if (outliers.length === 0) getOutliersData();
  }, [dispatch]);

  const filterOutliers = () => {
    //if one of the categories is empty, need to ignore it.  but if there is one selected, then need to include it in what is filtered out
    return outliers.filter(
      (filter) =>
        filters.betTypes.includes(filter.bet_type) &&
        filters.teams.includes(filter.team)
    );
  };

  return (
    <div>
      {(isFiltered ? filterOutliers() : outliers).map((outlier) => {
        // console.log(outlier);
        return <OutliersCard outlier={outlier} />;
      })}
      {/* {outliers.map((outlier) => {
        // console.log(outlier);
        return <OutliersCard outlier={outlier} />;
      })} */}
      <h1>This is the outliers list component</h1>
    </div>
  );
};

export default OutliersList;
