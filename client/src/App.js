import { userActions } from "./store/userSlice";
import { useSelector,useDispatch } from "react-redux";


function App() {

const dispatch = useDispatch();
const user = useSelector(state => state.user);

const changeUser = () => {
  if (user.id === null) {
    dispatch(userActions.setUser({id: '1', username: 'blake'}))
  }
  else {
    dispatch(userActions.setUser({id: null, username: null}))
  }
}

  return (
    <div>
      <h1>{user.id}</h1>
      <h1>{user.username}</h1>
     hello
     <button onClick={() => changeUser()}>toggle user</button>
    </div>
  );
}

export default App;
