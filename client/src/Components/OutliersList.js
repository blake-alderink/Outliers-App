import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { outliersActions } from "../store/outliersSlice";
import { useEffect } from "react";

const OutliersList = () => {
  const dispatch = useDispatch();
  const outliers = useSelector((state) => state.outliers);

  useEffect(() => {
    //on load of component, set state to the database. Then we can map the outliers down below in the jsx
    const getOutliersData = async () => {
      const outliersList = await axios
        .get("http://localhost:8000/outliers")
        .then((res) => res.data);
      console.log("useeffect ran");
      dispatch(outliersActions.addOutliers(outliersList));
    };

    getOutliersData();
  }, [dispatch]);

  return (
    <div>
      {outliers.map((outlier) => {
        // console.log(outlier);
        return <h3>{outlier.bookmaker}</h3>;
      })}
      <h1>This is the outliers list component</h1>
    </div>
  );
};

export default OutliersList;
