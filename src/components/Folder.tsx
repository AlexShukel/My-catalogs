import React, { useContext } from "react";
import { IFolder } from "../objects/IFolder";
import { Photo } from "../objects/Photo";
import EditButton from "./buttons/EditButton";
import { CatalogContext } from "./catalog-context/CatalogContext";
import FoldersList from "./FoldersList";
import Head from "./Head";
import { useCatalogArrayContext } from "./hooks/UseCatalogArrayContext";
import useEditMode from "./hooks/UseEditMode";

interface Props {
    path: string;
}

const Folder = ({ path }: Props) => {
    const context = useContext(CatalogContext);
    const { add: addFolder } = useCatalogArrayContext<IFolder>(
        `${path}.folders`
    );
    const { add: addPhoto } = useCatalogArrayContext<Photo>(`${path}.photos`);
    const { isEditing, toggleEditing } = useEditMode();

    return (
        <div>
            <Head title="Folder test" />

            <FoldersList path={path} isEditing={isEditing} />

            <EditButton isEditing={isEditing} toggleEditing={toggleEditing} />
        </div>
    );
};

export default Folder;
