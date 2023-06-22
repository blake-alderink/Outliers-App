import { useSelector, useDispatch } from "react-redux";
import { filtersActions } from "../store/filtersSlice";
import { useEffect, useState } from "react";
import { outliersActions } from "../store/outliersSlice";

export function FiltersComponent() {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const sportsFilters = ["football", "baseball", "basketball"];
  const betTypesFilters = ["H2H", "Spread", "Over/Under"];
  const teamFilters = ["Atlanta Braves", "Detroit Tigers"];
  const outliers = useSelector((state) => state.outliers.outliersList);
  const [filterOptions, setFilterOptions] = useState({
    sports: [],
    betTypes: [],
    teams: [],
  });

  const checkHandler = (e) => {
    //change to only change state when apply filters is selected: say on click of apply filters, map through

    //need to have a list of filters that when apply filters is clicked, those filters sare then sent to the filters state which will then also filter out the list itself. so need to keep track of the filters here somehow and then send that state to the global state?
    if (sportsFilters.includes(e.target.value)) {
      if (e.target.checked) {
        setFilterOptions({
          ...filterOptions,
          sports: [...filterOptions.sports, e.target.value],
        });
      } else {
        setFilterOptions({
          ...filterOptions,
          sports: filterOptions.sports.filter(
            (sport) => sport !== e.target.value
          ),
        });
      }
    } else if (betTypesFilters.includes(e.target.value)) {
      if (e.target.checked) {
        setFilterOptions({
          ...filterOptions,
          betTypes: [...filterOptions.betTypes, e.target.value],
        });
      } else {
        setFilterOptions({
          ...filterOptions,
          betTypes: filterOptions.betTypes.filter(
            (betType) => betType !== e.target.value
          ),
        });
      }
    } else {
      if (e.target.checked) {
        setFilterOptions({
          ...filterOptions,
          teams: [...filterOptions.teams, e.target.value],
        });
      } else {
        setFilterOptions({
          ...filterOptions,
          teams: filterOptions.teams.filter((team) => team !== e.target.value),
        });
      }
    }
  };

  const applyFilters = () => {
    console.log(outliers);
    dispatch(filtersActions.filterBetTypes(filterOptions.betTypes));
    dispatch(filtersActions.filterSports(filterOptions.sports));
    dispatch(filtersActions.filterTeams(filterOptions.teams));
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
