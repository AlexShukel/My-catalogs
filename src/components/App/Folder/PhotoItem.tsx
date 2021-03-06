import React, { useCallback } from "react";
import { Box, Icon, ListItem, Tooltip } from "@material-ui/core";

import { StyledIconButton } from "../../../App";
import { Photo } from "../../../objects/Photo";
import { saveFile, deleteFile } from "../../../utils/electronUtils";
import PhotoField from "../../fields/PhotoField";
import usePhotoField from "../../hooks/usePhotoField";
import { useI18n } from "../../i18n/I18nContext";

import css from "./PhotoItem.module.css";

const defaultI18n = {
    remove: "Remove",
};

interface Props {
    index: number;
    photo: Photo;
    isEditing: boolean;
    updatePhotoPath: (index: number, newPath: string) => void;
    handleFullscreen: (index: number) => void;
    remove: (index: number) => void;
    namedPath: string;
}

const PhotoItem = ({
    photo: { url },
    index,
    isEditing,
    updatePhotoPath,
    remove,
    namedPath,
    handleFullscreen,
}: Props) => {
    const i18n = useI18n(defaultI18n, "PhotoItem");

    const photoUploader = useCallback(
        async (file: File) => {
            const newPath = await saveFile(
                file,
                `catalogs/${namedPath}/${file.name}`
            );
            updatePhotoPath(index, newPath);
        },
        [index, namedPath, updatePhotoPath]
    );

    const handleDelete = useCallback(() => {
        deleteFile(url);
        updatePhotoPath(index, "");
    }, [url, index, updatePhotoPath]);

    const { handleChange, handleDrop } = usePhotoField(photoUploader);

    return (
        <ListItem className={css["list-item"]}>
            <PhotoField
                img={url}
                width={240}
                height={180}
                handleChange={handleChange}
                handleDrop={handleDrop}
                editable={isEditing}
                handleDelete={handleDelete}
                handleFullscreen={() => handleFullscreen(index)}
            />
            {isEditing && (
                <Box className={css["list-item__delete"]}>
                    <Tooltip title={i18n.remove}>
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
        </ListItem>
    );
};

export default PhotoItem;
