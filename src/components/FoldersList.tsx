import React, { useCallback } from "react";
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

const ICON_SIZE = 32;

interface Props {
    path: string;
    namedPath: string;
    isEditing: boolean;
}

const FoldersList = ({ path, namedPath, isEditing }: Props) => {
    const { array: folders, remove } = useCatalogArrayContext<IFolder>(
        `${path}.folders`
    );

    const removeFolder = useCallback(
        (index: number) => {
            deleteFolder(`catalogs/${namedPath}/${folders[index].name}`);
            remove(index);
        },
        [folders, namedPath, remove]
    );

    return folders.length > 0 ? (
        <List>
            {folders.map(({ icon, id, name }, index) => (
                <Link key={id} href={`folder?path=${path}.folders.${index}`}>
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
                                        onClick={() => removeFolder(index)}
                                    >
                                        <Icon fontSize="small">delete</Icon>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            )}
                        </ListItem>
                    )}
                </Link>
            ))}
        </List>
    ) : null;
};

export default FoldersList;
