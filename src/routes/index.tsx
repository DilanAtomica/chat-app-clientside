import React from 'react';
import {createHashRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

const Register = React.lazy(() => import("../pages/Register/index"));
const Login = React.lazy(() => import("../pages/Login/index"));
const Home = React.lazy(() => import("../pages/Home/index"));
const Searched = React.lazy(() => import("../pages/Searched"));
const Profile = React.lazy(() => import("../pages/Profile"));
const Chat = React.lazy(() => import("../pages/Chat"));

function AppRoutes() {

    const router = createHashRouter(
        createRoutesFromElements(
            <Route errorElement={<h1>There is nothing to see here...</h1>}>
                <Route element={<PublicRoutes/>}>
                    <Route element={<><Login/></>} path="/login"/>
                    <Route element={<> <Register/> </>} path="/register"/>
                </Route>
                <Route element={<ProtectedRoutes/>}>
                    <Route element={<><Home/></>} path="/home"/>
                    <Route element={<><Searched/></>} path="/search/:searchWord/:page"/>
                    <Route element={<><Profile/></>} path="/profile"/>
                    <Route element={<><Chat/></>} path="/chat"/>
                </Route>
            </Route>
        )
    )

    return (
        <RouterProvider router={router} />
    );
}

export default AppRoutes;