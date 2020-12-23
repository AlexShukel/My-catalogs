import React, { useContext } from "react";
import { get } from "lodash";

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

    const namedPath = React.useMemo(() => {
        let iterablePath = path;
        const names = [];
        while (iterablePath !== "") {
            names.unshift(get(context, iterablePath).name);
            iterablePath = iterablePath.replace(/\.?\w+\.\d+$/g, "");
        }
        return names.join("/");
    }, [path, context]);

    return (
        <div>
            <Head title={namedPath} />

            <FoldersList
                path={path}
                namedPath={namedPath}
                isEditing={isEditing}
            />

            <PhotosList
                path={path}
                namedPath={namedPath}
                isEditing={isEditing}
            />

            {/* BUTTONS */}
            <FolderAddButton path={path} namedPath={namedPath} />
            <EditButton isEditing={isEditing} toggleEditing={toggleEditing} />
        </div>
    );
};

export default Folder;
