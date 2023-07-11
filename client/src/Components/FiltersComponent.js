import { useSelector, useDispatch } from "react-redux";
import { filtersActions } from "../store/filtersSlice";
import { useEffect, useState, useRef } from "react";
import { outliersActions } from "../store/outliersSlice";
import "../styles/Filters.css";

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
        ...new Set(outliers.map((outlier) => outlier.sport)),
      ];
      teamFilters.current = teamFilterValues;
      // setFilterOptions({ ...filterOptions, betTypes: values });
    };
    console.log(outliers);
    getFilterValues();
    // dispatch(filtersActions.filterSports(sportsFilters));
    // dispatch(filtersActions.filterBetTypes(betTypesFilters));
  }, [dispatch, outliers]);

  return (
    <>
      <div className="filters-section">
        <div className="filters-inner-container">
          <div className="filters-buttons-container">
            <button onClick={() => applyFilters()} className="filters-button">
              Apply Filters
            </button>
            <button onClick={() => clearFilters()} className="filters-button">
              Clear Filters
            </button>
          </div>
        </div>
        <div className="filters-inner-container">
          <div className="middle-filters-container">
            <label className="filter-label">Bet Type</label>
            {betTypesFilters.current.map((bet_type) => {
              return (
                <div className="filter-checkbox">
                  <input
                    className="checkbox"
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
        </div>
        <div className="filters-inner-container">
          <div className="middle-filters-container">
            <label className="filter-label">Sport</label>
            {teamFilters.current.map((team) => {
              return (
                <div className="filter-checkbox">
                  <input
                    value={team}
                    type="checkbox"
                    onChange={checkHandler}
                    checked={filterOptions.teams.includes(team)}
                    className="checkbox"
                  />
                  <span>{team}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
