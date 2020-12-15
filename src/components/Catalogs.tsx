import React, { useCallback } from "react";
import { ipcRenderer } from "electron";
import {
    List,
    ListItem,
    Paper,
    ListItemText,
    Typography,
    Box,
    IconButton,
    Icon,
    useTheme,
} from "@material-ui/core";

import Head from "./Head";
import { useI18n } from "./i18n/I18nContext";
import { useCatalogArrayContext } from "./hooks/UseCatalogArrayContext";
import { Catalog } from "../objects/Catalog";
import NewCatalogForm from "./forms/NewCatalogForm";
import { getUniqueId } from "../utils/utils";
import useEditMode from "./hooks/UseEditMode";
import { Link } from "./router/Router";
import PhotoField from "./fields/PhotoField";

import css from "./Catalogs.module.css";
import EditButton from "./buttons/EditButton";

const defaultI18n = {
    catalogs: "Catalogs",
    edit: "Edit",
};

const Catalogs = () => {
    const i18n = useI18n(defaultI18n, "Catalogs");
    const { array, add, remove } = useCatalogArrayContext<Catalog>("catalogs");
    const { isEditing, toggleEditing } = useEditMode();

    const {
        palette: {
            primary: { main: primaryMain },
            secondary: { main: secondaryMain },
        },
    } = useTheme();

    const uploadCatalogCover = useCallback(
        async (file: File | null, name: string) => {
            const coverPath = file
                ? await ipcRenderer.invoke(
                      "UPLOAD_CATALOG_COVER",
                      name,
                      await file.arrayBuffer(),
                      file.name
                  )
                : "";
            return coverPath;
        },
        []
    );

    const createNewCatalog = useCallback(
        async (name: string, file: File | null) => {
            const createdFolder = await ipcRenderer.invoke("NEW_CATALOG", name);
            const coverPath = await uploadCatalogCover(file, name);
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
        [array, add, uploadCatalogCover]
    );

    return (
        <div>
            <Head title={i18n.catalogs} className={css.head} />

            <List className="list">
                {array &&
                    array.map((catalog: Catalog, index) => (
                        <ListItem
                            key={catalog.id}
                            className={css["list-item-size"]}
                        >
                            <Link href={`folder?path=catalogs.${index}`}>
                                {(onClick) => (
                                    <Paper
                                        onClick={onClick}
                                        style={{
                                            backgroundColor: primaryMain,
                                        }}
                                        className={css["item"]}
                                    >
                                        <PhotoField
                                            width={300}
                                            height={200}
                                            img={catalog.coverPath}
                                            handleChange={(e) => {
                                                //
                                            }}
                                            editable={isEditing}
                                        />
                                        <ListItemText disableTypography>
                                            <Typography
                                                className={css["item__name"]}
                                                variant="h4"
                                            >
                                                {catalog.name}
                                            </Typography>
                                        </ListItemText>
                                        {isEditing && (
                                            <Box
                                                className={css["item__delete"]}
                                            >
                                                <IconButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        remove(index);
                                                    }}
                                                    style={{
                                                        color: "#fff",
                                                        backgroundColor: secondaryMain,
                                                    }}
                                                >
                                                    <Icon>delete</Icon>
                                                </IconButton>
                                            </Box>
                                        )}
                                    </Paper>
                                )}
                            </Link>
                        </ListItem>
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
