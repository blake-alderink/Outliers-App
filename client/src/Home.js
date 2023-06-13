import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from './store/userSlice';
import React from 'react';


//once login is approved, then you do a get to an endpoint that returns the user and you set the userSlice that way. Favorites can be gotten afterward using another get using hte user id as a parameter.  this will set teh favorites of the userSlice, which will then 

//but for now, just going to use the guest that will set the userSlice without the login and then from there will run the favorites get

//login endpoint - after login is approved, then yuo will setUser to the correct id, username and everthing 


//for one login endpoint - run axios.get for user where username is equal to whoever logged in: then setUser to that value.  then you want to run another get with the correct id from the user and set favorites to that value.


const Home = () => {


const dispatch = useDispatch();
const user = useSelector(state => state.user);

const userLogin = () => {
    
}



const guestLoginFunction = async () => {
    try {

        const favorites = await axios.get(`http://localhost:8000/home/favorites/1`).then(res=>res.data)
        await dispatch(userActions.setUser({favorites: favorites, username: 'guest', id: 1, isLoggedIn: true}));
        console.log(user);

    } catch (error) {
        console.log(error.message)
    }





}


return (
    <div>
        Hello
        <button onClick={() => guestLoginFunction()}>
            Continue as Guest
        </button>
        <h4>
            this is the home user id {user.id}
        </h4>
    </div>
)


}

export default Home;