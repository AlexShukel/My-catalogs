import React from "react";

import Head from "../Head";
import { useI18n } from "../../i18n/I18nContext";
import CatalogsList from "./CatalogsList";
import NewCatalogButton from "./NewCatalogButton";

import css from "./Catalogs.module.css";

const defaultI18n = {
    catalogs: "Catalogs",
};

const Catalogs = () => {
    const i18n = useI18n(defaultI18n, "Catalogs");

    return (
        <div>
            <Head title={i18n.catalogs} className={css.head} />

            <CatalogsList />

            <NewCatalogButton />
        </div>
    );
};

export default Catalogs;
