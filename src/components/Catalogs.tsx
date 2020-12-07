import React from "react";

import Head from "./Head";
import { useI18n } from "./i18n/I18nContext";

const defaultI18n = {
    catalogs: "Catalogs",
};

const Catalogs = () => {
    const i18n = useI18n(defaultI18n, "Catalogs");
    return (
        <div>
            <Head title={i18n.catalogs} />
        </div>
    );
};

export default Catalogs;
