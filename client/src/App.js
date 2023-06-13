import { userActions } from "./store/userSlice";
import { useSelector,useDispatch } from "react-redux";
import axios from 'axios';



function App() {


const dispatch = useDispatch();
const user = useSelector(state => state.user);

// const changeUser = () => {
//   if (user.id === null || user.id !== null) {
//     // axios.get('http://localhost:8000/')
//     dispatch(userActions.setUser({id: '1', username: user.username === 'blake' ? 'timmy' : 'blake'}))
//   }
//   else {
//     dispatch(userActions.setUser({id: null, username: null}))
//   }
// }

  return (
    <div>
      <h1>{user.id}</h1>
      <h1>{user.username}</h1>
     hello
     <button>toggle user</button>
    </div>
  );
}

export default App;
