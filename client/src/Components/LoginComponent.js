import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const LoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  axios.defaults.withCredentials = true;

  const changeHandler = (e) => {
    setInputs({ ...Inputs, [e.target.name]: e.target.value });
    console.log(Inputs);
  };

  const loginHandler = async () => {
    // const userGet = await axios
    //   .get(`http://localhost:8000/users/${Inputs.username}`)
    //   .then((res) => {
    //     console.log(res.data);
    //     return res.data;
    //   });
    //this is where you will run the get function to get the user information and then pump that in
    // if (userGet) {
    //   const favorites = await axios
    //     .get(`http://localhost:8000/home/favorites/${userGet.user_id}`)
    //     .then((res) => res.data);
    //   console.log(userGet);
    //   await dispatch(
    //     userActions.setUser({
    //       username: userGet.username,
    //       id: userGet.id,
    //       favorites: favorites,
    //       isLoggedIn: true,
    //     })
    //   );
    //   setTimeout(() => {
    //     navigate("/home/outliers");
    //   }, 1000);
    // } else {
    //   await dispatch(userActions.resetState());
    //   setErrorMessage("this user does not exist");
    //   console.log(errorMessage, "hi", user);
    // }
    //logic: run the axios post, if works, run another axios get request to get the user information,and then set the user data to that and run the favorites axios get request as well and set the favorites to that state. at this point everything will be set and you can navigate to the home page, where the outliers will run

    try {
      await axios
        .post(`http://localhost:8000/auth/loginUser`, Inputs)
        .then(async function (res) {
          console.log(res.data);
          const favorites = await axios.get(
            `http://localhost:8000/home/favorites/${res.data.rows[0].user_id}`
          );

          console.log(res.data.rows[0].username, "res.data.rows.username");

          dispatch(
            userActions.setUser({
              id: res.data.rows[0].user_id,
              username: res.data.rows[0].username,
              isLoggedIn: true,
              favorites: favorites.data,
            })
          );
          console.log(user);
          navigate("/home/outliers");
          console.log(user);
        })
        .catch((err) => err.message);
    } catch (err) {
      console.log(err.message);
    }
    //  if it fails, return the message in the error message state
  };

  const createUserHandler = async () => {
    try {
      await axios
        .post(`http://localhost:8000/auth/createUser`, Inputs)
        .then(async function (res) {
          console.log(res.status, "this is the res status?");
          if (res.status !== 200) {
            console.log(res.data, "hiiii");
            setErrorMessage("res.data");
          } else {
            const favorites = await axios.get(
              `http://localhost:8000/home/favorites/${res.data.rows[0].user_id}`
            );
            console.log(res.data.rows[0].username, "res.data.rows.username");

            dispatch(
              userActions.setUser({
                id: res.data.rows[0].user_id,
                username: res.data.rows[0].username,
                isLoggedIn: true,
                favorites: favorites.data,
              })
            );

            navigate("/home/outliers");
          }
        })
        .catch((err) => setErrorMessage(err.response.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  // const [usernameInput, setUsernameInput] = useState("");
  // const [passwordInput, setPasswordInput] = useState("");
  const [Inputs, setInputs] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user.isLoggedIn === false) {
      axios
        .get("http://localhost:8000/users", { withCredentials: true })
        .then(async function (res) {
          if (res.data !== false) {
            const favorites = await axios.get(
              `http://localhost:8000/home/favorites/${res.data.user_id}`
            );

            dispatch(
              userActions.setUser({
                id: res.data.user_id,
                username: res.data.username,
                isLoggedIn: true,
                favorites: favorites.data,
              })
            );

            return navigate("/home/outliers");
          }
        })

        .catch((err) => console.log(err));
    }

    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) return null;
  else
    return (
      <div className="login-outer-container">
        <div className="login-inner-container">
          <h1
            style={{ margin: "auto", fontSize: "3rem", marginBottom: "1rem" }}
          >
            Outliers
          </h1>
          <div className="inputs-outer-container">
            <div className="input-container">
              <label>Username</label>
              <input
                name="username"
                value={Inputs.username}
                onChange={changeHandler}
              ></input>
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                name="password"
                value={Inputs.password}
                onChange={changeHandler}
              ></input>
            </div>
          </div>
          <div className="login-buttons-outer-container">
            <div className="login-buttons-container">
              <button className="login-button" onClick={() => loginHandler()}>
                Login
              </button>
              <button
                className="login-button"
                onClick={() => createUserHandler()}
              >
                Create Account
              </button>
            </div>
            <div className="login-buttons-container">
              <button className="login-button">Continue As Guest</button>
            </div>
          </div>
          <h3 style={{ color: "white" }}>{errorMessage}</h3>
        </div>
        <div
          style={{
            marginLeft: "20vw",
            marginRight: "20vw",
            textAlign: "center",
            fontSize: "1.2rem",
          }}
        >
          Find the outlier bet opportunities so you can get the best odds.
        </div>
        <div
          style={{
            marginTop: "1rem",
            marginLeft: "10vw",
            marginRight: "10vw",
            textAlign: "center",
            fontSize: ".8rem",
          }}
        >
          Please note: guest users are unable to select favorites. Please create
          an account in order to save favorites. Thanks!
        </div>
      </div>
    );
};

export default LoginComponent;
