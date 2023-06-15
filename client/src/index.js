import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Home from "./Home";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import FavoriteList from "./Components/FavoriteList";
import LoginComponent from "./Components/LoginComponent";
import { LoadBettingData } from "./Components/LoadBettingData";
import LoadOutlierData from "./Components/LoadOutlierData";
import OutliersList from "./Components/OutliersList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <LoginComponent />
      <Home />
      <LoadBettingData />
      <LoadOutlierData />
      <OutliersList />
      <App />
      <FavoriteList />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
