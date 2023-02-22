import React from 'react';
import {Outlet, Navigate} from "react-router-dom";
import {useAuthUser} from "../hooks/api";
import LoadingScreen from "../components/LoadingScreen";

function ProtectedRoutes() {
    const {data, isFetching} = useAuthUser();
    return (
        isFetching ? <LoadingScreen /> : data?.authenticated ? <Outlet /> : <Navigate to="/login"/>
    );
}

export default ProtectedRoutes;