import React, { useContext } from "react";

import EditButton from "./buttons/EditButton";
import FolderAddButton from "./buttons/FolderAddButton";
import { CatalogContext } from "./catalog-context/CatalogContext";
import FoldersList from "./FoldersList";
import Head from "./Head";
import useEditMode from "./hooks/UseEditMode";
import PhotosList from "./PhotosList";

interface Props {
    path: string;
}

const Folder = ({ path }: Props) => {
    const context = useContext(CatalogContext);
    const { isEditing, toggleEditing } = useEditMode();

    return (
        <div>
            <Head title="Folder test" />

            <FoldersList path={path} isEditing={isEditing} />

            <PhotosList path={path} />

            {/* BUTTONS */}
            <FolderAddButton path={path} />
            <EditButton isEditing={isEditing} toggleEditing={toggleEditing} />
        </div>
    );
};

export default Folder;
