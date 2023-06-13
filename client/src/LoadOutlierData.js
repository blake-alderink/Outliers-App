import axios from "axios";


const LoadOutlierData = () => {

const getOutliers = async () => {

const outliers = await axios.get('http://localhost:8000/bets/unique').then(res => outlierAlgo(res.data))



}

const outlierAlgo = async (arr) => {

    const outliers = [];

for (let i = 0; i < arr.length; i++) {

const allBetsWithThisString = await axios.get(`http://localhost:8000/bets/${arr[i].uniquestring}`)
.then(res => res.data)

let total = 0;
let bettingBasis;

if (allBetsWithThisString[0].points_amount === 10000) {
     bettingBasis = 'betting_line'
} else {
   bettingBasis = 'points_amount'
}

    for (let j = 0; j < allBetsWithThisString.length; i++) {

        const bettingLine = allBetsWithThisString[j][`${bettingBasis}`]

        total += bettingLine;

    }

    let average = total/allBetsWithThisString.length;
    let betting_diff = 0;
    let outlier = {bet_id: '', bookmaker: '', betting_line: 10000, average_line: average};

    for (let k = 0; k < allBetsWithThisString.length; k++) {

        const diff = average - (allBetsWithThisString[k][`${bettingBasis}`])

        if (diff > betting_diff) {
            betting_diff = diff;
            outlier.bet_id = allBetsWithThisString[k].bet_id;
            outlier.bookmaker = allBetsWithThisString[k].bookmaker;
            outlier.betting_line = allBetsWithThisString[k].betting_line;
        }

    }

outliers.push(outlier);

}

return outliers;
}





return <div>
    Load Outlier Data Component
</div>
}

export default LoadOutlierData;