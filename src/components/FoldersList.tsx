import React, { useCallback, useContext } from "react";
import { List } from "@material-ui/core";

import { IFolder } from "../objects/IFolder";
import { useCatalogArrayContext } from "./hooks/UseCatalogArrayContext";
import { deleteFolder } from "../utils/electronUtils";
import { useI18n } from "./i18n/I18nContext";
import { showConfirmPopup } from "./Popups/Utils";
import { PopupContext } from "./Popups/PopupController";
import FolderItem from "./FolderItem";

const defaultI18n = {
    confirmationMessage: "Are you sure you want to delete category?",
};

interface Props {
    path: string;
    namedPath: string;
    isEditing: boolean;
}

const FoldersList = ({ path, namedPath, isEditing }: Props) => {
    const { setConfig, dismiss } = useContext(PopupContext);
    const { array: folders, remove, modify } = useCatalogArrayContext<IFolder>(
        `${path}.folders`
    );

    const updateFolderIcon = useCallback(
        (index: number, newPath: string) => {
            modify(
                {
                    ...folders[index],
                    icon: newPath,
                },
                index
            );
        },
        [modify, folders]
    );

    const i18n = useI18n(defaultI18n, "FoldersList");

    const handleRemove = useCallback(
        async (index: number) => {
            if (
                await showConfirmPopup(
                    i18n.confirmationMessage,
                    setConfig,
                    dismiss
                )
            ) {
                deleteFolder(`catalogs/${namedPath}/${folders[index].name}`);
                remove(index);
            }
        },
        [folders, i18n, namedPath, setConfig, remove, dismiss]
    );

    return (
        <React.Fragment>
            {folders.length > 0 && (
                <List>
                    {folders.map((folder, index) => (
                        <FolderItem
                            key={folder.id}
                            folder={folder}
                            index={index}
                            path={path}
                            namedPath={namedPath}
                            isEditing={isEditing}
                            handleRemove={handleRemove}
                            updateIcon={updateFolderIcon}
                        />
                    ))}
                </List>
            )}
        </React.Fragment>
    );
};

export default FoldersList;
