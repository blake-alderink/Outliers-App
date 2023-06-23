import { useSelector, useDispatch } from "react-redux";
import { filtersActions } from "../store/filtersSlice";
import { useEffect, useState, useRef } from "react";
import { outliersActions } from "../store/outliersSlice";

export function FiltersComponent() {
  const filters = useSelector((state) => state.filters);
  const bets = useSelector((state) => state.bets);
  const dispatch = useDispatch();
  const sportsFilters = useRef([]);
  const betTypesFilters = useRef([]);
  const teamFilters = useRef([]);
  const outliers = useSelector((state) => state.outliers.outliersList);
  const [filterOptions, setFilterOptions] = useState({
    sports: [],
    betTypes: [],
    teams: [],
  });

  const checkHandler = (e) => {
    if (sportsFilters.current.includes(e.target.value)) {
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
    } else if (betTypesFilters.current.includes(e.target.value)) {
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
    console.log(filterOptions);
    dispatch(
      filtersActions.filterBetTypes(
        filterOptions.betTypes.length === 0
          ? betTypesFilters.current
          : filterOptions.betTypes
      )
    );
    dispatch(
      filtersActions.filterSports(
        filterOptions.sports.length === 0
          ? sportsFilters.current
          : filterOptions.sports
      )
    );
    dispatch(
      filtersActions.filterTeams(
        filterOptions.teams.length === 0
          ? teamFilters.current
          : filterOptions.teams
      )
    );
    dispatch(outliersActions.setIsFiltered(true));
  };

  const clearFilters = () => {
    setFilterOptions({ sports: [], betTypes: [], teams: [] });

    dispatch(outliersActions.setIsFiltered(false));
  };

  useEffect(() => {
    const getFilterValues = () => {
      const betTypeFilterValues = [
        ...new Set(outliers.map((outlier) => outlier.bet_type)),
      ];
      betTypesFilters.current = betTypeFilterValues;
      const teamFilterValues = [
        ...new Set(outliers.map((outlier) => outlier.team)),
      ];
      teamFilters.current = teamFilterValues;
      // setFilterOptions({ ...filterOptions, betTypes: values });
    };

    getFilterValues();
    // dispatch(filtersActions.filterSports(sportsFilters));
    // dispatch(filtersActions.filterBetTypes(betTypesFilters));
  }, [dispatch, outliers]);

  return (
    <>
      <h1>Filters Component</h1>
      <button onClick={() => console.log(filters, outliers, bets)}>
        console log filters state
      </button>
      <button onClick={() => applyFilters()}>Apply Filters</button>
      <button onClick={() => clearFilters()}>Clear Filters</button>
      <div>
        {betTypesFilters.current.map((bet_type) => {
          return (
            <div>
              <input
                value={bet_type}
                type="checkbox"
                onChange={checkHandler}
                checked={filterOptions.betTypes.includes(bet_type)}
              />
              <span>{bet_type}</span>
            </div>
          );
        })}
      </div>
      <div>
        {teamFilters.current.map((team) => {
          return (
            <div>
              <input
                value={team}
                type="checkbox"
                onChange={checkHandler}
                checked={filterOptions.teams.includes(team)}
              />
              <span>{team}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
