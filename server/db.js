const Pool = require("pg").Pool;

const database_url =
  process.env.DATABASE_URL ||
  `postgres://opxyzjlpzdjrmn:619ee8018a2280cebfe11d00863b0cf5c45f7233fd37df9071d8d18f01375cd9@ec2-3-221-177-27.compute-1.amazonaws.com:5432/d2n2vdjgpbfa51
`;

// const pool = new Pool({

//     user: 'postgres',
//     password: 'charlie',
//     host: 'localhost',
//     port: 5432,
//     database: 'bettinglines'

// });

const pool = new Pool({
  connectionString: database_url,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
