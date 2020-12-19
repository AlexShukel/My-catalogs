import React, { useContext } from "react";

import { IFolder } from "../objects/IFolder";
import { Photo } from "../objects/Photo";
import EditButton from "./buttons/EditButton";
import FolderAddButton from "./buttons/FolderAddButton";
import { CatalogContext } from "./catalog-context/CatalogContext";
import FoldersList from "./FoldersList";
import Head from "./Head";
import { useCatalogArrayContext } from "./hooks/UseCatalogArrayContext";
import useEditMode from "./hooks/UseEditMode";
import PhotosList from "./PhotosList";

interface Props {
    path: string;
}

const Folder = ({ path }: Props) => {
    const context = useContext(CatalogContext);
    const { add: addFolder, array: folders } = useCatalogArrayContext<IFolder>(
        `${path}.folders`
    );
    const { add: addPhoto, array: photos } = useCatalogArrayContext<Photo>(
        `${path}.photos`
    );
    const { isEditing, toggleEditing } = useEditMode();

    return (
        <div>
            <Head title="Folder test" />

            {folders.length > 0 && (
                <FoldersList path={path} isEditing={isEditing} />
            )}

            {photos.length > 0 && <PhotosList photos={photos} />}

            {/* BUTTONS */}
            <FolderAddButton />
            <EditButton isEditing={isEditing} toggleEditing={toggleEditing} />
        </div>
    );
};

export default Folder;
