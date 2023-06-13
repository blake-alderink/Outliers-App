import { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { userActions } from "./store/userSlice";
import axios from "axios";

const LoginComponent = () => {

    const dispatch = useDispatch();

const user = useSelector(state => state.user)

const changeHandler = (e) => {
    setUsernameInput(e.target.value)
    console.log(usernameInput)
}

const loginHandler = async () => {

const userGet = await axios.get(`http://localhost:8000/users/${usernameInput}`).then(res=> {
console.log(res.data);    
return res.data})

    //this is where you will run the get function to get the user information and then pump that in
if (userGet) {
    const favorites = await axios.get(`http://localhost:8000/home/favorites/${userGet.user_id}`).then(res=> res.data)
    console.log(userGet)
    await dispatch(userActions.setUser({username: userGet.username, id: userGet.id, favorites: favorites, isLoggedIn: true}))
} else {
    await dispatch(userActions.resetState())
    setErrorMessage('this user does not exist');
console.log(errorMessage, 'hi', user)
}

}

const [usernameInput, setUsernameInput] = useState('')
const [errorMessage, setErrorMessage] = useState('')

return (
<div>
    <input value={usernameInput} onChange={changeHandler}></input>
    <button onClick={() => loginHandler()}>Login</button>
    <h3>{errorMessage}</h3>
</div>
)

}


export default LoginComponent