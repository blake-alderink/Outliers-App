import axios from "axios";


const LoadOutlierData = () => {

const postOutliers = async () => {

const outliers = await axios.get('http://localhost:8000/bets/unique').then(res => outlierAlgo(res.data))
//this should return an array of the outliers that can then be looped through and posted to the database

for (let i = 0; i < outliers.length; i++) {
try { 
    await axios.post('http://localhost:8000/outliers', outliers[i])

    
} catch (error) {
    console.log(error.message);
}

}

}


const outlierAlgo = async (arr) => {
    console.log("made it to the outlierAlgo")

    const outliers = [];

for (let i = 0; i < arr.length; i++) {
console.log(arr[i].uniquestring)
const allBetsWithThisString = await axios.get(`http://localhost:8000/bets/unique/${arr[i].uniquestring}`)
.then(res => res.data)
//still need to add this endpoint: gets all bets with the unique string of that
console.log(allBetsWithThisString)
let total = 0;
let bettingBasis;

if (allBetsWithThisString[0].points_amount === '10000') {
     bettingBasis = 'betting_line'
} else {
   bettingBasis = 'points_amount'
}

    for (let j = 0; j < allBetsWithThisString.length; j++) {
        
        console.log('made it to this array', bettingBasis);

        const bettingLine = allBetsWithThisString[j][`${bettingBasis}`]

        total += Number(bettingLine);

    }

    let average = Number((total/allBetsWithThisString.length).toFixed(1));
    console.log(average);
    let betting_diff = 0;
    let outlier = {bet_id: '', bookmaker: '', betting_line: 10000, average_line: average};

    for (let k = 0; k < allBetsWithThisString.length; k++) {

        const diff = average - (allBetsWithThisString[k][`${bettingBasis}`])

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
}





return <div>
   <button onClick={() => postOutliers()}>get outlier data</button>
</div>
}

export default LoadOutlierData;