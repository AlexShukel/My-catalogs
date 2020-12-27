import React, { useCallback, useContext } from "react";
import { Box, List, Button, Icon, TextField } from "@material-ui/core";
import { set } from "lodash";

import Head from "./Head";
import { useI18n } from "./i18n/I18nContext";
import { useCatalogArrayContext } from "./hooks/UseCatalogArrayContext";
import { Catalog } from "../objects/Catalog";
import { getUniqueId } from "../utils/utils";
import useEditMode from "./hooks/UseEditMode";
import EditButton from "./buttons/EditButton";
import { CatalogContext } from "./catalog-context/CatalogContext";
import CatalogItem from "./CatalogItem";
import { createFolder, deleteFolder, saveFile } from "../utils/electronUtils";
import { PopupContext } from "./Popups/PopupController";
import PhotoField from "./fields/PhotoField";
import { DialogFormConfig } from "./hooks/useDialogForm";
import { showConfirmPopup } from "./Popups/Utils";

import css from "./Catalogs.module.css";

const defaultI18n = {
    catalogs: "Catalogs",
    edit: "Edit",
    confirmationMessage: "Are you sure you want to delete catalog?",
    createNewCatalog: "Create new catalog",
    newCatalog: "New catalog",
    name: "Name",
};

const Catalogs = () => {
    const i18n = useI18n(defaultI18n, "Catalogs");
    const catalogContext = useContext(CatalogContext);
    const { setConfig, dismiss } = useContext(PopupContext);
    const { array, add, remove } = useCatalogArrayContext<Catalog>("catalogs");
    const { isEditing, toggleEditing } = useEditMode();

    const updateCoverPath = useCallback(
        (index: number, newPath: string) =>
            catalogContext.setValues(
                set(catalogContext, `catalogs.${index}.coverPath`, newPath)
            ),
        [catalogContext]
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

    const openCatalogForm = useCallback(
        () =>
            setConfig({
                title: i18n.newCatalog,
                // eslint-disable-next-line react/display-name
                dialogContent: ({
                    text,
                    handleChange,
                    handleKeyPress,
                    inputRef,
                    error,
                    uploadPhoto,
                    handleDrop,
                    handleDelete,
                    img,
                }: DialogFormConfig) => (
                    <React.Fragment>
                        <TextField
                            fullWidth
                            label={i18n.name}
                            value={text}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            inputRef={inputRef}
                            error={!!error}
                            helperText={error}
                        />
                        <PhotoField
                            handleChange={uploadPhoto}
                            handleDrop={handleDrop}
                            handleDelete={handleDelete}
                            img={img}
                            height={300}
                            width={400}
                            editable={true}
                        />
                    </React.Fragment>
                ),
                handleSubmit: createNewCatalog,
            }),
        [createNewCatalog, i18n, setConfig]
    );

    const handleRemove = useCallback(
        async (index: number) => {
            if (
                await showConfirmPopup(
                    i18n.confirmationMessage,
                    setConfig,
                    dismiss
                )
            ) {
                deleteFolder(`catalogs/${array[index].name}`);
                remove(index);
            }
        },
        [remove, array, i18n, setConfig, dismiss]
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
                            remove={handleRemove}
                            updateCoverPath={updateCoverPath}
                        />
                    ))}
            </List>

            {/* Buttons */}
            <Box className="edit-btn">
                <EditButton
                    isEditing={isEditing}
                    toggleEditing={toggleEditing}
                />
                <Box className={css["add-btn"]}>
                    <Button
                        color="secondary"
                        variant="contained"
                        startIcon={<Icon>add</Icon>}
                        onClick={openCatalogForm}
                    >
                        {i18n.createNewCatalog}
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default Catalogs;
