import React from "react";
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

const ICON_SIZE = 32;

interface Props {
    path: string;
    isEditing: boolean;
}

const FoldersList = ({ path, isEditing }: Props) => {
    const { array: folders, remove } = useCatalogArrayContext<IFolder>(
        `${path}.folders`
    );
    return (
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
                                    <IconButton onClick={() => remove(index)}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            )}
                        </ListItem>
                    )}
                </Link>
            ))}
        </List>
    );
};

export default FoldersList;
