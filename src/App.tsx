import React, {useEffect, useState} from 'react';
import AppProvider from "./providers/app";
import AppRoutes from "./routes";
import LoadingScreen from "./components/LoadingScreen";
import useLoadingScreen from "./stores/Loading";
import useScreenWidth from "./stores/screenWidth";

function App() {

    const loadingScreen = useLoadingScreen();
    const {changeWidth} = useScreenWidth();

    useEffect(() => {
        changeWidth(window.innerWidth);
        function handleWindowResize() {
            changeWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
      <AppProvider>
          {loadingScreen.showLoadingScreen && <LoadingScreen />}
          <AppRoutes />
      </AppProvider>
  );
}

export default App;
