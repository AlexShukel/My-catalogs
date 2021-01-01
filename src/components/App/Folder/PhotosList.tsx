import React, { useCallback, useState } from "react";
import { Dialog, DialogContent, List } from "@material-ui/core";

import { Photo } from "../../../objects/Photo";
import { useCatalogArrayContext } from "../../hooks/useCatalogArrayContext";
import PhotoItem from "./PhotoItem";
import { deleteFile } from "../../../utils/electronUtils";
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
                    url: newPath,
                },
                index
            ),
        [photos, modify]
    );

    const deletePhoto = useCallback(
        (index: number) => {
            deleteFile(photos[index].url);
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
                <Dialog
                    open={sliderOpened}
                    onClose={closeSlider}
                    maxWidth={false}
                >
                    <DialogContent>
                        <PhotoSlider
                            closeSlider={closeSlider}
                            photos={photos}
                            initialIndex={initialIndex}
                            folderPath={path}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </React.Fragment>
    ) : null;
};

export default PhotosList;
