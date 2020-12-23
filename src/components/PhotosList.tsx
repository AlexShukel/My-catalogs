import React, { useCallback, useState } from "react";
import { Backdrop, List } from "@material-ui/core";

import { Photo } from "../objects/Photo";
import { useCatalogArrayContext } from "./hooks/UseCatalogArrayContext";
import PhotoItem from "./PhotoItem";
import { deleteFile } from "../utils/electronUtils";
import PhotoSlider from "./PhotoSlider";

interface Props {
    path: string;
    namedPath: string;
    isEditing: boolean;
}

const PhotosList = ({ path, namedPath, isEditing }: Props) => {
    const { array: photos, modify, remove } = useCatalogArrayContext<Photo>(
        `${path}.photos`
    );

    const [{ open: sliderOpened, initialIndex }, setOpenSlider] = useState({
        open: false,
        initialIndex: 0,
    });

    const closeSlider = useCallback(
        () =>
            setOpenSlider({
                open: false,
                initialIndex,
            }),
        [initialIndex]
    );

    const openSlider = useCallback(
        (index: number) => setOpenSlider({ initialIndex: index, open: true }),
        []
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
        <React.Fragment>
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
                        handleFullscreen={openSlider}
                    />
                ))}
            </List>
            {/* SLIDER */}
            {sliderOpened && (
                <Backdrop style={{ zIndex: 10 }} open={sliderOpened}>
                    <PhotoSlider
                        closeSlider={closeSlider}
                        photos={photos}
                        initialIndex={initialIndex}
                    />
                </Backdrop>
            )}
        </React.Fragment>
    ) : null;
};

export default PhotosList;
