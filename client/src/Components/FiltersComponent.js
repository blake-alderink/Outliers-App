import { useSelector, useDispatch } from "react-redux";
import { filtersActions } from "../store/filtersSlice";
import { useEffect } from "react";
import { outliersActions } from "../store/outliersSlice";

export function FiltersComponent() {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const sportsFilters = ["football", "baseball", "basketball"];
  const betTypesFilters = ["H2H", "Spread", "Over/Under"];
  const teamFilters = ["Atlanta Braves", "Detroit Tigers"];
  const outliers = useSelector((state) => state.outliers.outliersList);

  const checkHandler = (e) => {
    if (sportsFilters.includes(e.target.value)) {
      if (e.target.checked) {
        dispatch(
          filtersActions.filterSports([...filters.sports, e.target.value])
        );
      } else {
        dispatch(
          filtersActions.filterSports(
            filters.sports.filter((sport) => sport !== e.target.value)
          )
        );
      }
    } else if (betTypesFilters.includes(e.target.value)) {
      if (e.target.checked) {
        dispatch(
          filtersActions.filterBetTypes([...filters.betTypes, e.target.value])
        );
      } else {
        dispatch(
          filtersActions.filterBetTypes(
            filters.betTypes.filter((bet) => bet !== e.target.value)
          )
        );
      }
    } else {
      if (e.target.checked) {
        dispatch(
          filtersActions.filterTeams([...filters.teams, e.target.value])
        );
      } else {
        dispatch(
          filtersActions.filterTeams(
            filters.teams.filter((team) => team !== e.target.value)
          )
        );
      }
    }
  };

  const applyFilters = () => {
    console.log(outliers);
    dispatch(outliersActions.setIsFiltered(true));
  };

  useEffect(() => {
    // dispatch(filtersActions.filterSports(sportsFilters));
    // dispatch(filtersActions.filterBetTypes(betTypesFilters));
  }, [dispatch]);

  return (
    <>
      <h1>Filters Component</h1>
      <button onClick={() => console.log(filters)}>
        console log filters state
      </button>
      <button onClick={() => applyFilters()}>Apply Filters</button>
      <div>
        {teamFilters.map((team) => {
          return (
            <div>
              <input value={team} type="checkbox" onChange={checkHandler} />
              <span>{team}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
