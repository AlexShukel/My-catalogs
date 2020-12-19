import React from "react";
import { List, ListItem } from "@material-ui/core";

import { Photo } from "../objects/Photo";

interface Props {
    photos: Photo[];
}

const PhotosList = ({ photos }: Props) => {
    return (
        <List>
            {photos.map((photo, index) => (
                <ListItem key={photo.id}></ListItem>
            ))}
        </List>
    );
};

export default PhotosList;
