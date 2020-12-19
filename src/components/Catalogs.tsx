import React, { useCallback, useContext } from "react";
import { List } from "@material-ui/core";
import { set } from "lodash";

import Head from "./Head";
import { useI18n } from "./i18n/I18nContext";
import { useCatalogArrayContext } from "./hooks/UseCatalogArrayContext";
import { Catalog } from "../objects/Catalog";
import NewCatalogForm from "./forms/NewCatalogForm";
import { getUniqueId } from "../utils/utils";
import useEditMode from "./hooks/UseEditMode";
import EditButton from "./buttons/EditButton";
import { CatalogContext } from "./catalog-context/CatalogContext";
import CatalogItem from "./CatalogItem";
import { createFolder, deleteFolder, saveFile } from "../utils/electronUtils";

import css from "./Catalogs.module.css";

const defaultI18n = {
    catalogs: "Catalogs",
    edit: "Edit",
};

const Catalogs = () => {
    const i18n = useI18n(defaultI18n, "Catalogs");
    const context = useContext(CatalogContext);
    const { array, add, remove } = useCatalogArrayContext<Catalog>("catalogs");
    const { isEditing, toggleEditing } = useEditMode();

    const updateCoverPath = useCallback(
        (index: number, newPath: string) =>
            context.setValues(
                set(context, `catalogs.${index}`, {
                    ...array[index],
                    coverPath: newPath,
                })
            ),
        [context, array]
    );

    const createNewCatalog = useCallback(
        async (file: File | null, catalogName: string) => {
            const createdFolder = await createFolder(`catalogs/${catalogName}`);
            const coverPath = file
                ? await saveFile(file, `catalogs/${catalogName}/${file.name}`)
                : "";
            if (createdFolder) {
                add({
                    id: getUniqueId(array, "id"),
                    name: catalogName,
                    coverPath,
                    folders: [],
                    photos: [],
                });
            }
        },
        [array, add]
    );

    const removeCatalog = useCallback(
        (index: number) => {
            deleteFolder(`catalogs/${array[index].name}`);
            remove(index);
        },
        [array, remove]
    );

    return (
        <div>
            <Head title={i18n.catalogs} className={css.head} />

            <List className="list">
                {array &&
                    array.map((catalog: Catalog, index) => (
                        <CatalogItem
                            key={catalog.id}
                            catalog={catalog}
                            index={index}
                            isEditing={isEditing}
                            remove={removeCatalog}
                            updateCoverPath={updateCoverPath}
                        />
                    ))}
            </List>

            {/* Buttons */}
            <EditButton isEditing={isEditing} toggleEditing={toggleEditing} />

            {/* POPUPS */}
            <NewCatalogForm onSubmit={createNewCatalog} />
        </div>
    );
};

export default Catalogs;
