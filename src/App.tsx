import React from 'react';
import AppProvider from "./providers/app";
import AppRoutes from "./routes";
import LoadingScreen from "./components/LoadingScreen";
import useLoadingScreen from "./stores/Loading";

function App() {

    const loadingScreen = useLoadingScreen();

  return (
      <AppProvider>
          {loadingScreen.showLoadingScreen && <LoadingScreen />}
          <AppRoutes />
      </AppProvider>
  );
}

export default App;
