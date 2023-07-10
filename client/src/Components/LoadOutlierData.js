import axios from "axios";

const LoadOutlierData = () => {
  const postOutliers = async () => {
    const outliers = await axios
      .get("http://localhost:8000/bets/unique")
      .then((res) => outlierAlgo(res.data));
    //this should return an array of the outliers that can then be looped through and posted to the database

    for (let i = 0; i < outliers.length; i++) {
      try {
        await axios.post("http://localhost:8000/outliers", outliers[i]);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const outlierAlgo = async (arr) => {
    console.log(arr, "this is the log of arr");

    //in this function the arr is the list of unique bets, e.g. h2h braves vs tigers
    const outliers = [];

    for (let i = 0; i < arr.length; i++) {
      const allBetsWithThisString = await axios
        .get(`/bets/unique/${arr[i].uniquestring}`)
        .then((res) => res.data);
      //all bets with this string means all bets for the same betting game and type from the different bookmakers

      let sport = allBetsWithThisString[0].sport;
      console.log(sport, "this is the sport");

      let total = 0;
      let bettingBasis;

      if (allBetsWithThisString[0].points_amount === "10000") {
        bettingBasis = "betting_line";
      } else {
        bettingBasis = "points_amount";
      }

      for (let j = 0; j < allBetsWithThisString.length; j++) {
        const bettingLine = allBetsWithThisString[j][`${bettingBasis}`];

        total += Number(bettingLine);
      }

      let average = Number((total / allBetsWithThisString.length).toFixed(1));
      console.log(average, "this is the average");
      let betting_diff = 0;
      let outlier = {
        bet_id: "",
        bookmaker: "",
        betting_line: 10000,
        average_line: average,
        sport: sport,
      };

      for (let k = 0; k < allBetsWithThisString.length; k++) {
        const diff = average - allBetsWithThisString[k][`${bettingBasis}`];

        console.log(
          allBetsWithThisString[k].sport,
          "this is supposed to be the sport"
        );

        if (diff > betting_diff) {
          betting_diff = diff;
          outlier.bet_id = allBetsWithThisString[k].bet_id;
          outlier.bookmaker = allBetsWithThisString[k].bookmaker;
          outlier.betting_line = allBetsWithThisString[k][`${bettingBasis}`];
        }
      }

      outliers.push(outlier);
    }

    return outliers;
  };

  return (
    <div>
      <button onClick={() => postOutliers()}>get outlier data</button>
    </div>
  );
};

export default LoadOutlierData;
