import React from "react";
import { ThemeProvider } from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import { Route, Router } from "./components/router/Router";
import { I18nContext } from "./components/i18n/I18nContext";
import Catalogs from "./components/Catalogs";
import { CatalogController } from "./components/catalog-context/CatalogContext";
import Folder from "./components/Folder";

import "./styles.css";

const theme = createMuiTheme({
    overrides: {
        MuiListItem: {
            root: {
                width: undefined,
            },
        },
        MuiIconButton: {
            root: {
                color: "#fff",
                backgroundColor: "#2196f3",
                "&:hover": {
                    backgroundColor: "#0266f2",
                },
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
            {/* TODO create I18n */}
            <I18nContext.Provider value={{}}>
                <CatalogController>
                    <Router initialPage="catalogs">
                        <Route location="catalogs">{() => <Catalogs />}</Route>
                        <Route location="folder">
                            {(params) => <Folder path={params.path} />}
                        </Route>
                    </Router>
                </CatalogController>
            </I18nContext.Provider>
        </ThemeProvider>
    );
};

export default App;
