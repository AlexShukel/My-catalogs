import React, { useCallback } from "react";
import {
    ListItem,
    Paper,
    ListItemText,
    Typography,
    Box,
    Icon,
    useTheme,
    Tooltip,
} from "@material-ui/core";

import { StyledIconButton } from "../../../App";
import { Catalog } from "../../../objects/Catalog";
import { saveFile, deleteFile } from "../../../utils/electronUtils";
import PhotoField from "../../fields/PhotoField";
import usePhotoField from "../../hooks/usePhotoField";
import { useI18n } from "../../i18n/I18nContext";

import css from "./CatalogItem.module.css";
import { Link } from "../../router/Router";

const defaultI18n = {
    removeCatalog: "Remove catalog",
};

interface Props {
    catalog: Catalog;
    index: number;
    isEditing: boolean;
    remove: (index: number) => void;
    updateCoverUrl: (index: number, newPath: string) => void;
}

const CatalogItem = ({
    catalog,
    index,
    isEditing,
    remove,
    updateCoverUrl,
}: Props) => {
    const i18n = useI18n(defaultI18n, "CatalogItem");

    const {
        palette: {
            primary: { main: primaryMain },
        },
    } = useTheme();

    const catalogCoverUploader = useCallback(
        async (file: File) => {
            const newPath = await saveFile(
                file,
                `catalogs/${catalog.name}/${file.name}`
            );
            updateCoverUrl(index, newPath);
        },
        [index, updateCoverUrl, catalog.name]
    );

    const handleDelete = useCallback(() => {
        deleteFile(catalog.coverUrl);
        updateCoverUrl(index, "");
    }, [catalog.coverUrl, index, updateCoverUrl]);

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
                            img={catalog.coverUrl}
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
                                <Tooltip title={i18n.removeCatalog}>
                                    <StyledIconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            remove(index);
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </StyledIconButton>
                                </Tooltip>
                            </Box>
                        )}
                    </Paper>
                )}
            </Link>
        </ListItem>
    );
};

export default CatalogItem;
