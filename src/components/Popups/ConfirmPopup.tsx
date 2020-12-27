import React from "react";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@material-ui/core";

import { useI18n } from "../i18n/I18nContext";

const defaultI18n = {
    yes: "yes",
    cancel: "cancel",
    actionConfirmation: "Action confirmation",
};

interface Props {
    title?: string;
    message: string;
    resolve: (out: boolean) => void;
}

const ConfirmPopup = ({ title, message, resolve }: Props) => {
    const i18n = useI18n(defaultI18n, "ConfirmPopup");
    return (
        <React.Fragment>
            <DialogTitle
                disableTypography
                id="draggable-dialog-title"
                className="draggable"
            >
                <Typography variant="h5">
                    {title || i18n.actionConfirmation}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => resolve(true)}
                    color="secondary"
                    variant="contained"
                >
                    {i18n.yes}
                </Button>
                <Button
                    onClick={() => resolve(false)}
                    color="secondary"
                    variant="contained"
                >
                    {i18n.cancel}
                </Button>
            </DialogActions>
        </React.Fragment>
    );
};

export default ConfirmPopup;
