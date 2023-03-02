import React, {Suspense} from 'react';
import {BrowserRouter} from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query";
import LoadingScreen from "../components/LoadingScreen";
import {client} from "../lib/react-query";

type appProps = {
    children: React.ReactNode
}

function AppProvider({children}:appProps) {
    return (
        <div className="App">
            <Suspense fallback={<LoadingScreen/>}>
                <QueryClientProvider client={client}>
                        {children}
                </QueryClientProvider>
            </Suspense>
        </div>
    );
}

export default AppProvider;
