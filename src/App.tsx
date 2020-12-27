import React from "react";
import { IconButton, ThemeProvider, withStyles } from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import { Route, Router } from "./components/router/Router";
import { I18nContext } from "./components/i18n/I18nContext";
import Catalogs from "./components/Catalogs";
import {
    CatalogContext,
    CatalogController,
} from "./components/catalog-context/CatalogContext";
import Folder from "./components/Folder";
import SettingsPage from "./components/SettingsPage";
import { translations } from "./Translations/Translations";
import PopupController from "./components/Popups/PopupController";
import FormPopup from "./components/Popups/FormPopup";

import "./styles.css";

export const StyledIconButton = withStyles({
    root: {
        color: "#fff",
        backgroundColor: "#2196f3",
        "&:hover": {
            backgroundColor: "#0266f2",
        },
    },
})(IconButton);

const theme = createMuiTheme({
    overrides: {
        MuiListItem: {
            root: {
                width: undefined,
            },
        },
        MuiDialogContent: {
            root: {
                overflowY: "unset",
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
            <PopupController>
                <CatalogController>
                    <CatalogContext.Consumer>
                        {({ language }) => (
                            <I18nContext.Provider
                                value={translations[language]}
                            >
                                <Router initialPage="catalogs">
                                    <Route location="catalogs">
                                        {() => <Catalogs />}
                                    </Route>
                                    <Route location="folder">
                                        {(params) => (
                                            <Folder path={params.path} />
                                        )}
                                    </Route>
                                    <Route location="settings">
                                        {() => <SettingsPage />}
                                    </Route>
                                </Router>
                                <FormPopup />
                            </I18nContext.Provider>
                        )}
                    </CatalogContext.Consumer>
                </CatalogController>
            </PopupController>
        </ThemeProvider>
    );
};

export default App;
