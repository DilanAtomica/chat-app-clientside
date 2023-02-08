import React from 'react';
import {Route, Routes} from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

const Register = React.lazy(() => import("../pages/Register/index"));
const Login = React.lazy(() => import("../pages/Login/index"));
const Home = React.lazy(() => import("../pages/Home/index"));
const SearchedPage = React.lazy(() => import("../pages/Searched"));

function AppRoutes() {
    return (
        <Routes>
            <Route element={<PublicRoutes/>}>
                <Route element={<><Login/></>} path="/login"/>
                <Route element={<> <Register/> </>} path="/register"/>
            </Route>
            <Route element={<ProtectedRoutes/>}>
                <Route element={<><Home/></>} path="/home"/>
                <Route element={<><SearchedPage/></>} path="/search/:searchWord/:page"/>
            </Route>
        </Routes>
    );
}

export default AppRoutes;