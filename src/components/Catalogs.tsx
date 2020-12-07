import React, { useState, useCallback } from "react";
import { ipcRenderer } from "electron";
import { Box, Button, Icon } from "@material-ui/core";

import Head from "./Head";
import { useI18n } from "./i18n/I18nContext";
import { useCatalogArrayContext } from "./hooks/UseCatalogArrayContext";
import { Catalog } from "../objects/Catalog";

import css from "./Catalogs.module.css";

const defaultI18n = {
    catalogs: "Catalogs",
    createNewCatalog: "Create new catalog",
};

const Catalogs = () => {
    const i18n = useI18n(defaultI18n, "Catalogs");

    const { array, add, remove } = useCatalogArrayContext<Catalog>("catalogs");

    const createNewCatalog = useCallback(async (name: string) => {
        const success = await ipcRenderer.invoke("NEW_CATALOG", name);
        if (!success) {
            console.error("This name is already exists");
        }
    }, []);

    return (
        <div>
            <Head title={i18n.catalogs} className={css["head"]} />

            {array && array.map((catalog) => <div>{catalog.name}</div>)}

            <Box className={css["add-btn"]}>
                <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<Icon>add</Icon>}
                >
                    {i18n.createNewCatalog}
                </Button>
            </Box>
        </div>
    );
};

export default Catalogs;
