import axios from "axios";
import { dummyData } from "../dummy_data";
import { useSelector, useDispatch } from "react-redux";
import { betActions } from "../store/betSlice";

export const LoadBettingData = () => {
  const dispatch = useDispatch();

  const bets = useSelector((state) => state.bets);

  const loadData = () => {
    return formatData();

    // await bets.map(bet => {
    //     return axios.post(`http://localhost:8000/bets`, bet).then(res=> console.log(res.data)).catch(err => console.error(err.message))
    // })
  };

  return (
    <div>
      <button onClick={() => loadData()}>Load Data</button>
      {bets.map((bet) => (
        <h2>{bet.bet_type}</h2>
      ))}
    </div>
  );

  //for each of the game objects, there are bookmakeres.  inside each bookmakers are the different game types.

  //what are we looking for in our posting object? we are looking for:

  // CREATE TABLE bets(
  //     bet_id SERIAL PRIMARY KEY,
  //     bet_type VARCHAR(255),
  //     betting_line SMALLINT,
  //     team VARCHAR(255),
  //     opponent VARCHAR(255),
  //     bet_date VARCHAR(255),
  //     bookmaker VARCHAR(255)
  // );

  async function formatData() {
    let gameArr = dummyData;

    for (let i = 0; i < gameArr.length; i++) {
      const sport = gameArr[i].sport_title;
      console.log(
        sport,
        "this is where the sport_title key value pair is supposed to be coming from"
      );
      const bookmakersArr = gameArr[i].bookmakers;

      for (let j = 0; j < bookmakersArr.length; j++) {
        const markets = bookmakersArr[j].markets;

        for (let k = 0; k < markets.length; k++) {
          console.log("another market");
          let marketObj = markets[k];
          console.log(sport, "is this console.log of sport working?");

          for (let l = 0; l < marketObj.outcomes.length; l++) {
            const opponent =
              gameArr[i].home_team === marketObj.outcomes[l].name
                ? gameArr[i].away_team
                : gameArr[i].home_team;

            let betStuff;

            if (marketObj.key === "totals") {
              betStuff = {
                bet_type: `${marketObj.outcomes[l].name}`,
                betting_line: marketObj.outcomes[l].price,
                team: `${dummyData[0].home_team}`,
                opponent: `${dummyData[0].away_team}`,
                bookmaker: `${bookmakersArr[j].key}`,
                uniquestring: `${marketObj.outcomes[l].name}`.concat(
                  `${gameArr[i].home_team}`.split(" ").join("")
                ),
                points_amount: Number(marketObj.outcomes[l].point),
                sport: sport,
              };
            } else {
              const pointsVal = marketObj.outcomes[l].point
                ? marketObj.outcomes[l].point
                : 10000;

              betStuff = {
                bet_type: `${marketObj.key}`,
                betting_line: marketObj.outcomes[l].price,
                team: `${marketObj.outcomes[l].name}`,
                opponent: `${opponent}`,
                bookmaker: `${bookmakersArr[j].key}`,
                uniquestring: `${marketObj.key}`.concat(
                  `${marketObj.outcomes[l].name}`.split(" ").join("")
                ),
                points_amount: Number(pointsVal),
                sport: sport,
              };
            }

            //    dispatch(betActions.addBet(betStuff))
            try {
              await axios
                .post(`http://localhost:8000/bets`, betStuff)
                .then((res) => console.log(res.data))
                .catch((err) => console.error(err.message));
            } catch (error) {
              console.log(error.message);
            }
          }
        }
      }
    }
  }
};

//name + bet_type would equal to things like over_totals...

// let gameArr = dummyData;
// for( let i = 0; i < gameArr.length; i++) {

//     const bookmakersArr = gameArr[i].bookmakers;

// for (let j = 0; j < bookmakersArr.length; j++) {

//     const markets = bookmakersArr[j].markets;

//     for (let k = 0; k < markets.length; k++) {

//         let marketObj = markets[k];

//         for (let l = 0; l < marketObj.outcomes.length; l++) {

//             const opponent = gameArr[i].home_team === marketObj.outcomes[l].name ? gameArr[i].away_team : gameArr[i].home_team

//                 const betStuff = {
//                     bet_type: `${marketObj.key}`,
//                     betting_line: `${marketObj.outcomes[l].price}`,
//                     team: `${marketObj.outcomes[l].name}`,
//                     opponent: `${opponent}`,
//                     bookmaker: `${bookmakersArr[j].key}`
//                 }

//         }

//     }
// }

// }

// {
//     "id": "c383f4789232ede0272a45c4fdfa68d9",
//     "sport_key": "baseball_mlb",
//     "sport_title": "MLB",
//     "commence_time": "2023-06-13T22:40:00Z",
//     "home_team": "Detroit Tigers",
//     "away_team": "Atlanta Braves",
//     "bookmakers": [
//         {
//             "key": "draftkings",
//             "title": "DraftKings",
//             "last_update": "2023-06-13T05:12:45Z",
//             "markets": [
//                 {
//                     "key": "h2h",
//                     "last_update": "2023-06-13T05:12:45Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -255
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 215
//                         }
//                     ]
//                 },
//                 {
//                     "key": "spreads",
//                     "last_update": "2023-06-13T05:12:45Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -145,
//                             "point": -1.5
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 125,
//                             "point": 1.5
//                         }
//                     ]
//                 },
//                 {
//                     "key": "totals",
//                     "last_update": "2023-06-13T05:12:45Z",
//                     "outcomes": [
//                         {
//                             "name": "Over",
//                             "price": -120,
//                             "point": 8.0
//                         },
//                         {
//                             "name": "Under",
//                             "price": 100,
//                             "point": 8.0
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "key": "betonlineag",
//             "title": "BetOnline.ag",
//             "last_update": "2023-06-13T05:12:26Z",
//             "markets": [
//                 {
//                     "key": "h2h",
//                     "last_update": "2023-06-13T05:12:26Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -250
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 226
//                         }
//                     ]
//                 },
//                 {
//                     "key": "spreads",
//                     "last_update": "2023-06-13T05:12:26Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -149,
//                             "point": -1.5
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 130,
//                             "point": 1.5
//                         }
//                     ]
//                 },
//                 {
//                     "key": "totals",
//                     "last_update": "2023-06-13T05:12:26Z",
//                     "outcomes": [
//                         {
//                             "name": "Over",
//                             "price": 105,
//                             "point": 8.5
//                         },
//                         {
//                             "name": "Under",
//                             "price": -125,
//                             "point": 8.5
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "key": "betus",
//             "title": "BetUS",
//             "last_update": "2023-06-13T05:12:24Z",
//             "markets": [
//                 {
//                     "key": "h2h",
//                     "last_update": "2023-06-13T05:12:24Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -260
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 210
//                         }
//                     ]
//                 },
//                 {
//                     "key": "spreads",
//                     "last_update": "2023-06-13T05:12:24Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -150,
//                             "point": -1.5
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 130,
//                             "point": 1.5
//                         }
//                     ]
//                 },
//                 {
//                     "key": "totals",
//                     "last_update": "2023-06-13T05:12:24Z",
//                     "outcomes": [
//                         {
//                             "name": "Over",
//                             "price": 100,
//                             "point": 8.5
//                         },
//                         {
//                             "name": "Under",
//                             "price": -120,
//                             "point": 8.5
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "key": "circasports",
//             "title": "Circa Sports",
//             "last_update": "2023-06-13T05:12:52Z",
//             "markets": [
//                 {
//                     "key": "h2h",
//                     "last_update": "2023-06-13T05:12:52Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -271
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 217
//                         }
//                     ]
//                 },
//                 {
//                     "key": "spreads",
//                     "last_update": "2023-06-13T05:12:52Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -154,
//                             "point": -1.5
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 125,
//                             "point": 1.5
//                         }
//                     ]
//                 },
//                 {
//                     "key": "totals",
//                     "last_update": "2023-06-13T05:12:52Z",
//                     "outcomes": [
//                         {
//                             "name": "Over",
//                             "price": -108,
//                             "point": 8.0
//                         },
//                         {
//                             "name": "Under",
//                             "price": -113,
//                             "point": 8.0
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "key": "lowvig",
//             "title": "LowVig.ag",
//             "last_update": "2023-06-13T05:12:14Z",
//             "markets": [
//                 {
//                     "key": "h2h",
//                     "last_update": "2023-06-13T05:12:14Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -253
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 226
//                         }
//                     ]
//                 },
//                 {
//                     "key": "spreads",
//                     "last_update": "2023-06-13T05:12:14Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -146,
//                             "point": -1.5
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 135,
//                             "point": 1.5
//                         }
//                     ]
//                 },
//                 {
//                     "key": "totals",
//                     "last_update": "2023-06-13T05:12:14Z",
//                     "outcomes": [
//                         {
//                             "name": "Over",
//                             "price": 110,
//                             "point": 8.5
//                         },
//                         {
//                             "name": "Under",
//                             "price": -121,
//                             "point": 8.5
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "key": "bovada",
//             "title": "Bovada",
//             "last_update": "2023-06-13T05:12:40Z",
//             "markets": [
//                 {
//                     "key": "h2h",
//                     "last_update": "2023-06-13T05:12:40Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -250
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 205
//                         }
//                     ]
//                 },
//                 {
//                     "key": "spreads",
//                     "last_update": "2023-06-13T05:12:40Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -150,
//                             "point": -1.5
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 130,
//                             "point": 1.5
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "key": "williamhill_us",
//             "title": "William Hill (US)",
//             "last_update": "2023-06-13T05:12:45Z",
//             "markets": [
//                 {
//                     "key": "h2h",
//                     "last_update": "2023-06-13T05:12:45Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -267
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 215
//                         }
//                     ]
//                 },
//                 {
//                     "key": "spreads",
//                     "last_update": "2023-06-13T05:12:45Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -155,
//                             "point": -1.5
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 130,
//                             "point": 1.5
//                         }
//                     ]
//                 },
//                 {
//                     "key": "totals",
//                     "last_update": "2023-06-13T05:12:45Z",
//                     "outcomes": [
//                         {
//                             "name": "Over",
//                             "price": 105,
//                             "point": 8.5
//                         },
//                         {
//                             "name": "Under",
//                             "price": -125,
//                             "point": 8.5
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "key": "mybookieag",
//             "title": "MyBookie.ag",
//             "last_update": "2023-06-13T05:12:35Z",
//             "markets": [
//                 {
//                     "key": "h2h",
//                     "last_update": "2023-06-13T05:12:35Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -263
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 209
//                         }
//                     ]
//                 },
//                 {
//                     "key": "spreads",
//                     "last_update": "2023-06-13T05:12:35Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": 102,
//                             "point": -2.5
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": -125,
//                             "point": 2.5
//                         }
//                     ]
//                 },
//                 {
//                     "key": "totals",
//                     "last_update": "2023-06-13T05:12:35Z",
//                     "outcomes": [
//                         {
//                             "name": "Over",
//                             "price": -104,
//                             "point": 8.5
//                         },
//                         {
//                             "name": "Under",
//                             "price": -117,
//                             "point": 8.5
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "key": "foxbet",
//             "title": "FOX Bet",
//             "last_update": "2023-06-13T05:12:43Z",
//             "markets": [
//                 {
//                     "key": "h2h",
//                     "last_update": "2023-06-13T05:12:43Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -278
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 200
//                         }
//                     ]
//                 },
//                 {
//                     "key": "spreads",
//                     "last_update": "2023-06-13T05:12:43Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -125,
//                             "point": -2.0
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 100,
//                             "point": 2.0
//                         }
//                     ]
//                 },
//                 {
//                     "key": "totals",
//                     "last_update": "2023-06-13T05:12:43Z",
//                     "outcomes": [
//                         {
//                             "name": "Over",
//                             "price": -105,
//                             "point": 8.5
//                         },
//                         {
//                             "name": "Under",
//                             "price": -120,
//                             "point": 8.5
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "key": "pointsbetus",
//             "title": "PointsBet (US)",
//             "last_update": "2023-06-13T05:12:10Z",
//             "markets": [
//                 {
//                     "key": "h2h",
//                     "last_update": "2023-06-13T05:12:10Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -260
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 210
//                         }
//                     ]
//                 },
//                 {
//                     "key": "spreads",
//                     "last_update": "2023-06-13T05:12:10Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -150,
//                             "point": -1.5
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 125,
//                             "point": 1.5
//                         }
//                     ]
//                 },
//                 {
//                     "key": "totals",
//                     "last_update": "2023-06-13T05:12:10Z",
//                     "outcomes": [
//                         {
//                             "name": "Over",
//                             "price": -115,
//                             "point": 8.0
//                         },
//                         {
//                             "name": "Under",
//                             "price": -105,
//                             "point": 8.0
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "key": "betmgm",
//             "title": "BetMGM",
//             "last_update": "2023-06-13T05:12:25Z",
//             "markets": [
//                 {
//                     "key": "h2h",
//                     "last_update": "2023-06-13T05:12:25Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -275
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 220
//                         }
//                     ]
//                 },
//                 {
//                     "key": "spreads",
//                     "last_update": "2023-06-13T05:12:25Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": 100,
//                             "point": -2.5
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": -120,
//                             "point": 2.5
//                         }
//                     ]
//                 },
//                 {
//                     "key": "totals",
//                     "last_update": "2023-06-13T05:12:25Z",
//                     "outcomes": [
//                         {
//                             "name": "Over",
//                             "price": -115,
//                             "point": 8.0
//                         },
//                         {
//                             "name": "Under",
//                             "price": -105,
//                             "point": 8.0
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "key": "ballybet",
//             "title": "Bally Bet",
//             "last_update": "2023-06-13T05:12:40Z",
//             "markets": [
//                 {
//                     "key": "h2h",
//                     "last_update": "2023-06-13T05:12:40Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -255
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 215
//                         }
//                     ]
//                 },
//                 {
//                     "key": "spreads",
//                     "last_update": "2023-06-13T05:12:40Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -150,
//                             "point": -1.5
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 130,
//                             "point": 1.5
//                         }
//                     ]
//                 },
//                 {
//                     "key": "totals",
//                     "last_update": "2023-06-13T05:12:40Z",
//                     "outcomes": [
//                         {
//                             "name": "Over",
//                             "price": -105,
//                             "point": 8.5
//                         },
//                         {
//                             "name": "Under",
//                             "price": -115,
//                             "point": 8.5
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "key": "fanduel",
//             "title": "FanDuel",
//             "last_update": "2023-06-13T05:12:24Z",
//             "markets": [
//                 {
//                     "key": "h2h",
//                     "last_update": "2023-06-13T05:12:24Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -270
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 220
//                         }
//                     ]
//                 },
//                 {
//                     "key": "spreads",
//                     "last_update": "2023-06-13T05:12:24Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -152,
//                             "point": -1.5
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 126,
//                             "point": 1.5
//                         }
//                     ]
//                 },
//                 {
//                     "key": "totals",
//                     "last_update": "2023-06-13T05:12:24Z",
//                     "outcomes": [
//                         {
//                             "name": "Over",
//                             "price": 100,
//                             "point": 8.5
//                         },
//                         {
//                             "name": "Under",
//                             "price": -122,
//                             "point": 8.5
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "key": "superbook",
//             "title": "SuperBook",
//             "last_update": "2023-06-13T05:12:43Z",
//             "markets": [
//                 {
//                     "key": "h2h",
//                     "last_update": "2023-06-13T05:12:43Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -265
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 215
//                         }
//                     ]
//                 },
//                 {
//                     "key": "totals",
//                     "last_update": "2023-06-13T05:12:43Z",
//                     "outcomes": [
//                         {
//                             "name": "Over",
//                             "price": 100,
//                             "point": 8.5
//                         },
//                         {
//                             "name": "Under",
//                             "price": -120,
//                             "point": 8.5
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "key": "wynnbet",
//             "title": "WynnBET",
//             "last_update": "2023-06-13T05:12:33Z",
//             "markets": [
//                 {
//                     "key": "h2h",
//                     "last_update": "2023-06-13T05:12:33Z",
//                     "outcomes": [
//                         {
//                             "name": "Atlanta Braves",
//                             "price": -250
//                         },
//                         {
//                             "name": "Detroit Tigers",
//                             "price": 220
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// }
