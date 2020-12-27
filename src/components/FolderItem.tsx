import React, { useCallback } from "react";
import {
    ListItem,
    ListItemIcon,
    IconButton,
    Icon,
    ListItemText,
    ListItemSecondaryAction,
    Tooltip,
} from "@material-ui/core";

import { IFolder } from "../objects/IFolder";
import { Link } from "./router/Router";
import PhotoField from "./fields/PhotoField";
import usePhotoField from "./hooks/UsePhotoField";
import { deleteFile, saveFile } from "../utils/electronUtils";
import { StyledIconButton } from "../App";
import { useI18n } from "./i18n/I18nContext";

const defaultI18n = {
    removeFolderIcon: "Remove folder icon",
    removeCategory: "Remove category",
};

const ICON_SIZE = 32;

interface Props {
    index: number;
    folder: IFolder;
    path: string;
    namedPath: string;
    isEditing: boolean;
    handleRemove: (index: number) => void;
    updateIcon: (index: number, newPath: string) => void;
}

const FolderItem = ({
    index,
    path,
    namedPath,
    folder: { icon, name },
    isEditing,
    handleRemove,
    updateIcon,
}: Props) => {
    const iconUploader = useCallback(
        async (file: File) => {
            const newPath = await saveFile(
                file,
                `catalogs/${namedPath}/${file.name}`
            );
            updateIcon(index, newPath);
        },
        [index, namedPath, updateIcon]
    );

    const i18n = useI18n(defaultI18n, "FolderItem");

    const { handleChange } = usePhotoField(iconUploader);

    const handleDelete = useCallback(() => {
        deleteFile(icon!);
        updateIcon(index, "");
    }, [icon, index, updateIcon]);

    return (
        <Link href={`folder?path=${path}.folders.${index}`}>
            {(onClick) => (
                <ListItem button divider onClick={onClick}>
                    <ListItemIcon>
                        <PhotoField
                            img={icon ?? ""}
                            editable={isEditing}
                            height={ICON_SIZE}
                            width={ICON_SIZE}
                            handleChange={handleChange}
                            handleDelete={handleDelete}
                            icon="folder"
                            disableLabel
                            customDeleteIcon={
                                <Tooltip title={i18n.removeFolderIcon}>
                                    <StyledIconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete();
                                        }}
                                        style={{
                                            width: ICON_SIZE,
                                            height: ICON_SIZE,
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </StyledIconButton>
                                </Tooltip>
                            }
                        />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                    {isEditing && (
                        <ListItemSecondaryAction>
                            <Tooltip title={i18n.removeCategory}>
                                <IconButton onClick={() => handleRemove(index)}>
                                    <Icon fontSize="small">delete</Icon>
                                </IconButton>
                            </Tooltip>
                        </ListItemSecondaryAction>
                    )}
                </ListItem>
            )}
        </Link>
    );
};

export default FolderItem;
