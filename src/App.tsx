import React from "react";
import { ThemeProvider } from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { Route, Router } from "./components/router/Router";
import { I18nContext } from "./components/i18n/I18nContext";
import Catalogs from "./components/Catalogs";

const theme = createMuiTheme({
    overrides: {
        MuiListItem: {
            root: {
                width: undefined,
            },
        },
    },
    palette: {
        primary: {
            main: "#673ab7",
            light: "#9a67ea",
            dark: "#320b86",
        },
        secondary: {
            main: "#2196f3",
            light: "#6ec6ff",
            dark: "#0069c0",
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router initialPage="catalogs">
                {/* TODO create I18n */}
                <I18nContext.Provider value={{}}>
                    <Route location="catalogs">{() => <Catalogs />}</Route>
                    {/* <Route location="folder">
                        {(params) => <Folder path={params.path} />}
                    </Route> */}
                </I18nContext.Provider>
            </Router>
        </ThemeProvider>
    );
};

export default App;
