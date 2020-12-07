import React from "react";
import classNames from "classnames";
import { Paper, Typography, useTheme } from "@material-ui/core";

import BackButton from "./buttons/BackButton";

import css from "./Head.module.css";

interface Props {
    title: string;
    className?: string;
}

const Head = ({ title, className }: Props) => {
    const {
        palette: {
            primary: { main: primaryMain },
        },
    } = useTheme();
    return (
        <Paper
            style={{ backgroundColor: primaryMain }}
            square
            className={classNames(className, css["head"])}
        >
            <BackButton />
            <Typography variant="h3" className={css["head__title"]}>
                {title}
            </Typography>
        </Paper>
    );
};

export default Head;
