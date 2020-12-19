import React from "react";
import { List, ListItem } from "@material-ui/core";

import { Photo } from "../objects/Photo";
import { useCatalogArrayContext } from "./hooks/UseCatalogArrayContext";

interface Props {
    path: string;
}

const PhotosList = ({ path }: Props) => {
    const { array: photos } = useCatalogArrayContext<Photo>(`${path}.photos`);
    return photos.length > 0 ? (
        <List>
            {photos.map((photo, index) => (
                <ListItem key={photo.id}></ListItem>
            ))}
        </List>
    ) : null;
};

export default PhotosList;
