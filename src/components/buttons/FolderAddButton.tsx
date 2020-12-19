import React from "react";
import { Box, Button } from "@material-ui/core";
import { useI18n } from "../i18n/I18nContext";

import css from "./FolderAddButton.module.css";

const defaultI18n = {
    new: "New...",
};

const FolderAddButton = () => {
    const i18n = useI18n(defaultI18n, "FolderAddButton");
    return (
        <React.Fragment>
            <Box className={css["fix-bottom-left"]}>
                <Button color="secondary" variant="contained">
                    {i18n.new}
                </Button>
            </Box>
        </React.Fragment>
    );
};

export default FolderAddButton;
