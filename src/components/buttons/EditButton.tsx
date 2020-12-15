import { Box, Button, Icon } from "@material-ui/core";
import React from "react";
import { useI18n } from "../i18n/I18nContext";

import css from "./EditButton.module.css";

const defaultI18n = {
    edit: "Edit",
    done: "Done",
};

interface Props {
    isEditing: boolean;
    toggleEditing: () => void;
}

const EditButton = ({ isEditing, toggleEditing }: Props) => {
    const i18n = useI18n(defaultI18n, "EditButton");
    return (
        <Box className={css["edit-btn"]}>
            <Button
                startIcon={<Icon>{isEditing ? "done" : "edit"}</Icon>}
                color="secondary"
                variant="contained"
                onClick={toggleEditing}
            >
                {isEditing ? i18n.done : i18n.edit}
            </Button>
        </Box>
    );
};

export default EditButton;
