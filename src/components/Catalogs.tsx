import React, { useCallback } from "react";
import { ipcRenderer } from "electron";

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
        [array, add]
    );

    return (
        <div>
            <Head title={i18n.catalogs} className={css.head} />

            {array &&
                array.map((catalog, index) => (
                    <div key={catalog.id}>
                        {catalog.name}{" "}
                        <button
                            onClick={() => {
                                remove(index);
                                ipcRenderer
                                    .invoke("DELETE_CATALOG", catalog.name)
                                    .then();
                            }}
                        >
                            delete
                        </button>
                        <img
                            src={catalog.coverPath}
                            width={50}
                            height={50}
                            alt="There is not cover"
                        />
                    </div>
                ))}

            {/* POPUPS */}
            <NewCatalogForm onSubmit={createNewCatalog} />
        </div>
    );
};

export default Catalogs;
