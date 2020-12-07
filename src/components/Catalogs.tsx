import React, { useState, useCallback } from "react";
import { ipcRenderer } from "electron";
import { Box, Button, Icon } from "@material-ui/core";

import Head from "./Head";
import { useI18n } from "./i18n/I18nContext";
import { useCatalogArrayContext } from "./hooks/UseCatalogArrayContext";
import { Catalog } from "../objects/Catalog";
import NewCatalogForm from "./forms/NewCatalogForm";
import { getUniqueId } from "../utils/utils";

import css from "./Catalogs.module.css";

const defaultI18n = {
    catalogs: "Catalogs",
};

const Catalogs = () => {
    const i18n = useI18n(defaultI18n, "Catalogs");
    const { array, add, remove } = useCatalogArrayContext<Catalog>("catalogs");

    const createNewCatalog = useCallback(
        async (name: string, file: File | null) => {
            const createdFolder = await ipcRenderer.invoke("NEW_CATALOG", name);
            const coverPath = file
                ? await ipcRenderer.invoke(
                      "UPLOAD_CATALOG_COVER",
                      name,
                      await file.arrayBuffer(),
                      file.name
                  )
                : "";
            // TODO show snackbar
            if (createdFolder) {
                console.log("Created folder");
                add({
                    id: getUniqueId(array, "id"),
                    name,
                    coverPath,
                    folders: [],
                    photos: [],
                });
                if (coverPath) console.log("Added catalog cover");
            } else {
                console.log("FOLDER ALREADY EXISTS");
            }
        },
        []
    );

    return (
        <div>
            <Head title={i18n.catalogs} className={css["head"]} />

            {array &&
                array.map((catalog) => (
                    <div key={catalog.id}>{catalog.name}</div>
                ))}

            <button
                onClick={() =>
                    ipcRenderer.invoke(
                        "UPLOAD_CATALOG_COVER",
                        new Uint8Array(Buffer.from("Hello Node.js"))
                    )
                }
            >
                test
            </button>

            {/* POPUPS */}
            <NewCatalogForm onSubmit={createNewCatalog} />
        </div>
    );
};

export default Catalogs;
