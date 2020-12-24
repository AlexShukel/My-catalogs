import React from "react";
import classNames from "classnames";
import { Box, Icon, Paper, Typography, useTheme } from "@material-ui/core";

import BackButton from "./buttons/BackButton";
import { StyledIconButton } from "../App";
import { Link } from "./router/Router";

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
            className={css["head"]}
        >
            <div className={classNames(className, css["head__left"])}>
                <BackButton />
                <Typography variant="h3" className={css["head__title"]}>
                    {title}
                </Typography>
            </div>
            <Box className="button-margin">
                <Link href="settings">
                    {(onClick) => (
                        <StyledIconButton onClick={onClick}>
                            <Icon>settings</Icon>
                        </StyledIconButton>
                    )}
                </Link>
            </Box>
        </Paper>
    );
};

export default Head;
