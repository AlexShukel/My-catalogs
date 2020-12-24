import React, { useCallback, useContext } from "react";
import { Select, MenuItem, Typography } from "@material-ui/core";
import { set } from "lodash";

import { useI18n } from "./i18n/I18nContext";
import { defaultLanguageI18n, Language } from "../objects/Language";
import Head from "./Head";
import { CatalogContext } from "./catalog-context/CatalogContext";

import css from "./SettingsPage.module.css";

const defaultI18n = {
    languages: defaultLanguageI18n,
    settings: "Settings",
    selectLanguage: "Select language",
};

const SettingsPage = () => {
    const i18n = useI18n(defaultI18n, "SettingsPage");
    const context = useContext(CatalogContext);

    const handleChange = useCallback(
        (
            e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
        ) => {
            context.setValues(set(context, "language", e.target.value));
        },
        [context]
    );

    return (
        <div>
            <Head title={i18n.settings} />
            <div className={css["settings-container"]}>
                <Typography component="span">
                    {i18n.selectLanguage + ":"}
                </Typography>
                <Select
                    value={context.language}
                    className={css["select"]}
                    onChange={handleChange}
                >
                    {Object.keys(Language).map((key) => (
                        <MenuItem key={key} value={key}>
                            {i18n.languages[key as Language]}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        </div>
    );
};

export default SettingsPage;
