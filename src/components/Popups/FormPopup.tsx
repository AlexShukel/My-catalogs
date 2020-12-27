import React, { useCallback, useContext, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    PaperProps,
    Typography,
} from "@material-ui/core";
import Draggable from "react-draggable";

import { PopupConfig, PopupContext } from "./PopupController";
import { useI18n } from "../i18n/I18nContext";
import useDialogForm from "../hooks/useDialogForm";

const defaultI18n = {
    submit: "Submit",
};

export const PaperComponent = (props: PaperProps) => (
    <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
    >
        <Paper {...props} />
    </Draggable>
);

interface Props {
    config: PopupConfig;
    dismiss: () => void;
}

const ExistingFormPopup = ({
    config: { handleSubmit, required, title, dialogContent },
    dismiss,
}: Props) => {
    const i18n = useI18n(defaultI18n, "FormPopup");

    const dialogFormConfig = useDialogForm(handleSubmit, dismiss, required);

    const {
        submitForm,
        inputRef,
        setText,
        setImg,
        setError,
    } = dialogFormConfig;

    const closeForm = useCallback(() => {
        setText("");
        setImg("");
        setError("");
        dismiss();
    }, [setImg, setText, setError, dismiss]);

    useEffect(() => {
        setTimeout(() => inputRef?.current?.focus());
    }, [inputRef]);
    return (
        <Dialog open={true} onClose={closeForm} PaperComponent={PaperComponent}>
            <DialogTitle
                disableTypography
                id="draggable-dialog-title"
                className="draggable"
            >
                <Typography variant="h5">{title}</Typography>
            </DialogTitle>
            <DialogContent>{dialogContent(dialogFormConfig)}</DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={submitForm}
                >
                    {i18n.submit}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const FormPopup = () => {
    const { config, dismiss } = useContext(PopupContext);

    return config ? (
        <ExistingFormPopup config={config} dismiss={dismiss} />
    ) : null;
};

export default FormPopup;
