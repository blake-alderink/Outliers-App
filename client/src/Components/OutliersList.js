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
    return outliers.filter((filter) => filters.teams.includes(filter.team));
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
