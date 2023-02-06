import React from 'react';
import {Outlet, Navigate} from "react-router-dom";
import {useAuthUser} from "../hooks/api";
import LoadingScreen from "../components/LoadingScreen";

function PublicRoutes() {
    const {data, isFetching} = useAuthUser();
    return (
        isFetching ? <LoadingScreen /> : !data?.data.authenticated ? <Outlet /> : <Navigate to="/home"/>
    );
}

export default PublicRoutes;