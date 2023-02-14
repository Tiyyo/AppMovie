import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router";
import FirstPage from "../../components/Authentification/FirstPage";
import SignIn from "../../components/Authentification/SignIn";
import SignUp from "../../components/Authentification/SignUp";
import Modal from "../../components/Cards/Modal";
import Profile from "../../components/Profile/Profile";
import LoginLayout from "../../layout/LoginLayout";
import Films from "../../pages/Films/Films";
import Home from "../../pages/Home/Home";
import AddToPlaylist from "../../pages/Likes/AddToPlaylist";
import Likes from "../../pages/Likes/Likes";
import { Login } from "../../pages/Login/Login";
import TvShow from "../../pages/TvShow/TvShow";
import UserContext from "../Context/UserContextProvider";
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const {
    isAuth,
    isLoggedIn,
    setIsAuth,
    setIsLoggedIn,
    setUserID,
    setUserInfos,
  } = useContext(UserContext);

  const location = useLocation();
  const auth = async (token) => {
    await axios
      .get("http://localhost:5000/user/current", {
        headers: {
          "Authorization ": `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setUserID(res?.data?.id);
          setUserInfos({
            username: res?.data.username,
            email: res?.data?.email,
            password: res?.data?.password,
          });
          setIsAuth(true);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (window.localStorage.accesToken) {
      console.log(window.localStorage.accesToken);
      setIsLoggedIn(true);
      auth(window.localStorage.accesToken);
    } else {
      console.log("No token Avaiable");
    }
  }, []);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path={"/"}
          element={isAuth && isLoggedIn ? <Home /> : <LoginLayout />}
        >
          <Route path={""} element={<FirstPage />} />
          <Route path="SignIn" element={<SignIn />} />
          <Route path="SignUp" element={<SignUp />} />
        </Route>
        {/* <Route path={"/"} element={<LoginLayout />}></Route> */}
        <Route
          path={"*"}
          element={
            isAuth && isLoggedIn ? <Home /> : <Navigate to="/" replace={true} />
          }
        />
        <Route
          path={"/Home"}
          element={
            isAuth && isLoggedIn ? <Home /> : <Navigate to="/" replace={true} />
          }
        />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Likes" element={<Likes />}></Route>
        <Route path="/Films" element={<Films />}></Route>
        <Route path="/TvShow" element={<TvShow />}></Route>
        <Route path={`/:id/:modalid`} element={<Modal />} />
        <Route path={"/:id/:id/add_to_playlist"} element={<AddToPlaylist />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;