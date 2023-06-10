CREATE DATABASE bettinglines;

CREATE TABLE test_table(
    test_id SERIAL PRIMARY KEY,
    test_name VARCHAR(255)
);

CREATE TABLE users(
   user_id SERIAL PRIMARY KEY,
   username VARCHAR(255),
   pass VARCHAR(255),
   email VARCHAR(255)
);

CREATE TABLE bets(
    bet_id SERIAL PRIMARY KEY,
    bet_type VARCHAR(255),
    betting_line SMALLINT,
    team VARCHAR(255),
    opponent VARCHAR(255),
    bet_date VARCHAR(255),
    bookmaker VARCHAR(255)
);

-- CREATE TABLE test(
--     test_id SERIAL PRIMARY KEY,
-- )



CREATE TABLE favorites(
    favorite_id SERIAL PRIMARY KEY,
    user_ref INTEGER,
    bet_ref INTEGER,
    foreign key (user_ref) REFERENCES users (user_id),
    foreign key (bet_ref) REFERENCES bets (bet_id)
);

CREATE TABLE outliers(
    outlier_id SERIAL PRIMARY KEY,
    outliner_line INTEGER,
    average_line INTEGER,
    bookmaker VARCHAR(255)
);

////* what do we need to do to make it so that the tables are correctly split up?

we need to.... 

have one that is users.  guest will be one of these users. each user will have a list of their favorites as one of their attributes

other table will be bets.  this table will be for the bets that will hold the information like:

bet type:
- over/under
- totals
- moneyline

team/player: 

Opponent

date (delete from databse once date is older than the date of the event)

outlier line:

average line:

outlier bookmaker: 

//seperate record for each bookmaker
// so then you could have another table with the records that takes them all in and 

//here is whwat you do:

you have 3 tables.  the users, th intial table with a different record for each bookmaker, essentially a record for each return object from the API, and then a table with the final result that will be shown to users, the table with the outlier and the average.

on the large table of each record, you give them a column with value of a unique string that is created from the team + opponent + bet type.  

then you can run a SQL query that gets ONLY unique values from that column.  you store these values in an array of unique games/teams/bet types.

Then you loop through that array and for each one, do a sql query that finds all records with that value and thne finds the averages and the outlier.  then you run the function sending an object as a paremeter to create a record in the final OUTLIERS table using the new information.  you do this for each value in the array

for(let i = 0; i < array.length; i++) {

    const values = database.find(select * where "unique string value" is equal to array[i]) 
    //this will get you all different bookmakers for this particular betting line

    const average = (values.reduce())/values.length
    //or some method to give you the total value of all the values divided by the length of the array to find the average

    let outlier;

    for(let j = 0; j < values.length; j++) {

        if (outlier === undefined) {
            outlier = values[j]
        } else {
            if (average - outlier.bettingline < average - values[j].bettingline)  //use absolute value here....
            {
                outlier = values[j]
            }
        }

    }
    //this for loop loops through the values and compares them to the average, finding the outlier being the record with the biggest difference between the average and its betting line

    createOutlierRecord(outlier)
    //this will create a database record using the outlier as a parameter to send the outlier object


}

this is new

Then, you use this string to run a SQL query that finds all records with taht value.  