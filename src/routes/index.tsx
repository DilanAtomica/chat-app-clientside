import React from 'react';
import {Route, Routes} from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

const Register = React.lazy(() => import("../pages/Register/index"));
const Login = React.lazy(() => import("../pages/Login/index"));
const Home = React.lazy(() => import("../pages/Home/index"));
const Searched = React.lazy(() => import("../pages/Searched"));
const Profile = React.lazy(() => import("../pages/Profile"));

function AppRoutes() {
    return (
        <Routes>
            <Route element={<PublicRoutes/>}>
                <Route element={<><Login/></>} path="/login"/>
                <Route element={<> <Register/> </>} path="/register"/>
            </Route>
            <Route element={<ProtectedRoutes/>}>
                <Route element={<><Home/></>} path="/home"/>
                <Route element={<><Searched/></>} path="/search/:searchWord/:page"/>
                <Route element={<><Profile/></>} path="/profile"/>
            </Route>
        </Routes>
    );
}

export default AppRoutes;