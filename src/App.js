import React from "react";
import { Routes } from "./routes/Routes";
import { Provider } from "react-redux";
import initStore from "./redux/store";

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';



function App() {

  const theme = createMuiTheme({ });

  return  (
    <Provider store={initStore()}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Provider>
    );
}

export default App;
