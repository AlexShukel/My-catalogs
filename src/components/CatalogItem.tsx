import React, { useCallback } from "react";
import {
    ListItem,
    Paper,
    ListItemText,
    Typography,
    Box,
    IconButton,
    Icon,
    useTheme,
} from "@material-ui/core";

import { Catalog } from "../objects/Catalog";
import PhotoField from "./fields/PhotoField";
import { Link } from "./router/Router";
import { deleteCatalogCover, saveCatalogCover } from "../utils/electronUtils";

import css from "./CatalogItem.module.css";
import usePhotoField from "./hooks/UsePhotoField";

interface Props {
    catalog: Catalog;
    index: number;
    isEditing: boolean;
    remove: (index: number) => void;
    updateCoverPath: (index: number, newPath: string) => void;
}

const CatalogItem = ({
    catalog,
    index,
    isEditing,
    remove,
    updateCoverPath,
}: Props) => {
    const {
        palette: {
            primary: { main: primaryMain },
        },
    } = useTheme();

    const catalogCoverUploader = useCallback(
        async (file: File) => {
            const newPath = await saveCatalogCover(file, catalog.name);
            updateCoverPath(index, newPath);
        },
        [index, updateCoverPath, catalog.name]
    );

    const handleDelete = useCallback(() => {
        deleteCatalogCover(catalog.coverPath);
        updateCoverPath(index, "");
    }, [catalog.coverPath, index, updateCoverPath]);

    const { handleChange, handleDrop } = usePhotoField(catalogCoverUploader);

    return (
        <ListItem className={css["list-item-size"]}>
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
                            handleChange={handleChange}
                            handleDrop={handleDrop}
                            handleDelete={handleDelete}
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
                            <Box className={css["item__delete"]}>
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
    );
};

export default CatalogItem;
