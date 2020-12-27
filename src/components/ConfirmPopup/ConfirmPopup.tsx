import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@material-ui/core";

import { useI18n } from "../i18n/I18nContext";
import { PaperComponent } from "../Popups/FormPopup";

const defaultI18n = {
    yes: "yes",
    cancel: "cancel",
    actionConfirmation: "Action confirmation",
};

interface Props {
    open: boolean;
    title?: string;
    message: string;
    handleConfirm: () => void;
    handleCancel: () => void;
}

const ConfirmPopup = ({
    open,
    title,
    message,
    handleCancel,
    handleConfirm,
}: Props) => {
    const i18n = useI18n(defaultI18n, "ConfirmPopup");
    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            PaperComponent={PaperComponent}
        >
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
                    onClick={handleConfirm}
                    color="secondary"
                    variant="contained"
                >
                    {i18n.yes}
                </Button>
                <Button
                    onClick={handleCancel}
                    color="secondary"
                    variant="contained"
                >
                    {i18n.cancel}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmPopup;
