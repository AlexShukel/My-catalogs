import React from "react";
import classNames from "classnames";
import { Icon } from "@material-ui/core";

import css from "./PhotoView.module.css";

interface Props
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    path: string;
    children?: React.ReactNode;
}

const PhotoView = ({ path, children, ...other }: Props) => {
    return path ? (
        <div
            {...other}
            className={classNames(other.className, css["image"])}
            style={{
                ...other.style,
                backgroundImage: `url(${encodeURI(path.replace(/\\/g, "/"))})`,
            }}
        >
            {children}
        </div>
    ) : (
        <Icon fontSize="large">photo_album</Icon>
    );
};

export default PhotoView;
