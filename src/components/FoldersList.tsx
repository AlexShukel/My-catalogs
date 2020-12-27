import React, { useCallback, useContext } from "react";
import {
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from "@material-ui/core";

import { IFolder } from "../objects/IFolder";
import { Link } from "./router/Router";
import { useCatalogArrayContext } from "./hooks/UseCatalogArrayContext";
import { deleteFolder } from "../utils/electronUtils";
import { useI18n } from "./i18n/I18nContext";
import { showConfirmPopup } from "./Popups/Utils";
import { PopupContext } from "./Popups/PopupController";

const ICON_SIZE = 32;

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
    const { array: folders, remove } = useCatalogArrayContext<IFolder>(
        `${path}.folders`
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
                    {folders.map(({ icon, id, name }, index) => (
                        <Link
                            key={id}
                            href={`folder?path=${path}.folders.${index}`}
                        >
                            {(onClick) => (
                                <ListItem button divider onClick={onClick}>
                                    <ListItemIcon>
                                        {icon ? (
                                            <img
                                                src={icon}
                                                width={ICON_SIZE}
                                                height={ICON_SIZE}
                                            />
                                        ) : (
                                            <Icon fontSize="large">folder</Icon>
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={name} />
                                    {isEditing && (
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                onClick={() =>
                                                    handleRemove(index)
                                                }
                                            >
                                                <Icon fontSize="small">
                                                    delete
                                                </Icon>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    )}
                                </ListItem>
                            )}
                        </Link>
                    ))}
                </List>
            )}
        </React.Fragment>
    );
};

export default FoldersList;
