import React, { useCallback } from "react";
import { Box, Icon, ListItem } from "@material-ui/core";

import { Photo } from "../objects/Photo";
import PhotoField from "./fields/PhotoField";
import { deleteFile, saveFile } from "../utils/electronUtils";
import usePhotoField from "./hooks/UsePhotoField";
import { StyledIconButton } from "../App";

import css from "./PhotoItem.module.css";

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
    photo: { photo },
    index,
    isEditing,
    updatePhotoPath,
    remove,
    namedPath,
    handleFullscreen,
}: Props) => {
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
        deleteFile(photo);
        updatePhotoPath(index, "");
    }, [photo, index, updatePhotoPath]);

    const { handleChange, handleDrop } = usePhotoField(photoUploader);

    return (
        <ListItem className={css["list-item"]}>
            <PhotoField
                img={photo}
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
                    <StyledIconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            remove(index);
                        }}
                    >
                        <Icon>delete</Icon>
                    </StyledIconButton>
                </Box>
            )}
        </ListItem>
    );
};

export default PhotoItem;
