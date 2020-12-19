import React, { useCallback } from "react";
import { List } from "@material-ui/core";

import { Photo } from "../objects/Photo";
import { useCatalogArrayContext } from "./hooks/UseCatalogArrayContext";

import PhotoItem from "./PhotoItem";
import { deleteFile } from "../utils/electronUtils";
interface Props {
    path: string;
    namedPath: string;
    isEditing: boolean;
}

const PhotosList = ({ path, namedPath, isEditing }: Props) => {
    const { array: photos, modify, remove } = useCatalogArrayContext<Photo>(
        `${path}.photos`
    );

    const updatePhotoPath = useCallback(
        (index: number, newPath: string) =>
            modify(
                {
                    ...photos[index],
                    photo: newPath,
                },
                index
            ),
        [photos, modify]
    );

    const deletePhoto = useCallback(
        (index: number) => {
            deleteFile(photos[index].photo);
            remove(index);
        },
        [photos, remove]
    );

    return photos.length > 0 ? (
        <List className="list">
            {photos.map((photo, index) => (
                <PhotoItem
                    key={photo.id}
                    photo={photo}
                    index={index}
                    isEditing={isEditing}
                    namedPath={namedPath}
                    updatePhotoPath={updatePhotoPath}
                    remove={deletePhoto}
                />
            ))}
        </List>
    ) : null;
};

export default PhotosList;
