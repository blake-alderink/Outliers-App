import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

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
        .post(`http://localhost:8000/loginUser`, Inputs)
        .then(async function (res) {
          const favorites = await axios.get(
            `http://localhost:8000/home/favorites/${res.data.id}`
          );

          dispatch(
            userActions.setUser({
              id: res.data.id,
              username: res.data.username,
              isLoggedIn: true,
              favorites: favorites,
            })
          );

          navigate("/home/outliers");
        })
        .catch((err) => err.message);
    } catch (err) {
      console.log(err.message);
    }
    //  if it fails, return the message in the error message state
  };

  const createUserHandler = async () => {};

  // const [usernameInput, setUsernameInput] = useState("");
  // const [passwordInput, setPasswordInput] = useState("");
  const [Inputs, setInputs] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user.isLoggedIn) {
      console.log("redirect ran, user is logged in");
      return navigate("/home/outliers");
    }
  }, []);

  return (
    <div>
      <label>Username</label>
      <input
        name="username"
        value={Inputs.username}
        onChange={changeHandler}
      ></input>
      <label>Password</label>
      <input
        name="password"
        value={Inputs.password}
        onChange={changeHandler}
      ></input>
      <button onClick={() => loginHandler()}>Login</button>
      <button onClick={() => createUserHandler()}>Create Account</button>
      <h3>{errorMessage}</h3>
    </div>
  );
};

export default LoginComponent;
