import React, { useCallback } from "react";
import { ipcRenderer } from "electron";

import Head from "./Head";
import { useI18n } from "./i18n/I18nContext";
import { useCatalogArrayContext } from "./hooks/UseCatalogArrayContext";
import { Catalog } from "../objects/Catalog";
import NewCatalogForm from "./forms/NewCatalogForm";
import { getUniqueId } from "../utils/utils";

import css from "./Catalogs.module.css";
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
import useEditMode from "./hooks/UseEditMode";
import { Link } from "./router/Router";
import PhotoField from "./fields/PhotoField";

const defaultI18n = {
    catalogs: "Catalogs",
};

const Catalogs = () => {
    const i18n = useI18n(defaultI18n, "Catalogs");
    const { array, add, remove } = useCatalogArrayContext<Catalog>("catalogs");
    const { editable, handleEditable } = useEditMode();

    const {
        palette: {
            primary: { main: primaryMain },
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
                                        {/* <PhotoInput
                                            path={`catalogs[${index}].image`}
                                            className={css["photo-size"]}
                                            label={
                                                i18n.youCanAddCatalogCoverHere
                                            }
                                            editable={editable}
                                        /> */}
                                        <PhotoField
                                            width={300}
                                            height={200}
                                            img={catalog.coverPath}
                                            handleChange={(e) => {
                                                //
                                            }}
                                        />

                                        <ListItemText disableTypography>
                                            <Typography
                                                className={css["item__name"]}
                                                variant="h4"
                                            >
                                                {catalog.name}
                                            </Typography>
                                        </ListItemText>
                                        {editable && (
                                            <Box
                                                className={css["item__delete"]}
                                            >
                                                <IconButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        remove(index);
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

            {/* POPUPS */}
            <NewCatalogForm onSubmit={createNewCatalog} />
        </div>
    );
};

export default Catalogs;
