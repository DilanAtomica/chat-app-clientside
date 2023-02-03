import React from 'react';
import {Route, Routes} from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import HomePage from "../pages/Home";

const Register = React.lazy(() => import("../pages/Register/index"));
const Login = React.lazy(() => import("../pages/Login/index"));

function AppRoutes() {
    return (
        <Routes>
            <Route element={<PublicRoutes/>}>
                <Route element={<><Login/></>} path="/login"/>
                <Route element={<> <Register/> </>} path="/register"/>
            </Route>
            <Route element={<ProtectedRoutes/>}>
                <Route element={<><HomePage/></>} path="/home"/>
            </Route>
        </Routes>
    );
}

export default AppRoutes;