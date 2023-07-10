const express = require("express");
const guestRouter = require("./guestRouter");
const userRouter = require("./userRouter");
const homeRouter = require("./homeRouter");
const betsRouter = require("./betsRouter");
const outliersRouter = require("./outliersRouter");
const authRouter = require("./authRouter");
const pool = require("./db");
const path = require("path");
const cors = require("cors");
const session = require("express-session");

const app = express();

const sessionConfig = {
  name: "bettingapp",
  secret: "this is the secret for now",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
};

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(express.static(path.resolve(__dirname, "../build")));

app.use(session(sessionConfig));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", req.header.origin);
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//   );
//   next();
// });

app.use("/guest", guestRouter);
app.use("/users", userRouter);
app.use("/home", homeRouter);
app.use("/bets", betsRouter);
app.use("/outliers", outliersRouter);
app.use("/auth", authRouter);

app.get("/", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (error) {
    console.error(error.message);
  }
  // res.json("if this is showing up, then this is showing you that this is working")
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`app now listening on port ${PORT}`);
});

//on load, you would get user that matches, and set the state of the user. and then you would run the axios.get for the favorites, that would get the favorites that are assoicated with that user.

//how would you set this up...

//endpoint should be /favorites/:id
//which gives you the favorites from the id which is derived from the userSlice
//if the guest endpoint didn't exist, (which it shouldn't),
//you could just have a user endpoint that had a favorites endpoint that didn't need a parameter.
//don't actually need that... you just need a user endpoint.  and athen there can be a /favorites on it that will give yuo the favorites you need for that user.
