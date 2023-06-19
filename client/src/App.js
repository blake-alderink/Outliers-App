import { userActions } from "./store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import FavoriteCard from "./Components/FavoriteCard";
import FavoriteList from "./Components/FavoriteList";
import OutliersCard from "./Components/OutliersCard";
import OutliersList from "./Components/OutliersList";
import LoginComponent from "./Components/LoginComponent";
import { NavBar } from "./Components/NavBar";
import { ListChoose } from "./Components/ListChoose";
import { BodyComponent } from "./Components/BodyComponent";
import { ListContainer } from "./Components/ListContainer";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/home" element={<BodyComponent />}>
            {/* <Route index element={<ListContainer />} /> */}
            <Route path="outliers" element={<OutliersList />} />
            <Route path="favorites" element={<FavoriteList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
