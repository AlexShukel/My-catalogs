import React, { useContext } from "react";
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

import { PopupContext } from "./PopupController";
import { useI18n } from "../i18n/I18nContext";
import useDialogForm from "../hooks/useDialogForm";
import {
    CommonPopupConfig,
    FormPopupConfig,
    isCommonPopupConfig,
} from "./PopupData";

const defaultI18n = {
    submit: "Submit",
};

const PaperComponent = (props: PaperProps) => (
    <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
    >
        <Paper {...props} />
    </Draggable>
);

const DefaultTitle = ({ title }: { title: string }) => {
    return (
        <DialogTitle
            disableTypography
            id="draggable-dialog-title"
            className="draggable"
        >
            <Typography variant="h5">{title}</Typography>
        </DialogTitle>
    );
};

interface FormPopupProps {
    config: FormPopupConfig;
    dismiss: () => void;
}

const FormPopup = ({
    config: { handleSubmit, required, title, dialogContent },
    dismiss,
}: FormPopupProps) => {
    const i18n = useI18n(defaultI18n, "FormPopup");

    const dialogFormConfig = useDialogForm(handleSubmit, dismiss, required);

    const { submitForm, closeForm } = dialogFormConfig;

    return (
        <Dialog open={true} onClose={closeForm} PaperComponent={PaperComponent}>
            <DefaultTitle title={title} />
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

interface CommonPopupProps {
    config: CommonPopupConfig;
    dismiss: () => void;
}

const CommonPopup = ({
    config: { dialogContent, dialogActions, dialogTitle },
    dismiss,
}: CommonPopupProps) => {
    return (
        <Dialog open={true} onClose={dismiss} PaperComponent={PaperComponent}>
            <DefaultTitle title={dialogTitle ?? ""} />
            {dialogContent}
            {dialogActions?.(dismiss)}
        </Dialog>
    );
};

const Popup = () => {
    const { config, dismiss } = useContext(PopupContext);

    if (config) {
        if (isCommonPopupConfig(config)) {
            return <CommonPopup config={config} dismiss={dismiss} />;
        } else {
            return <FormPopup config={config} dismiss={dismiss} />;
        }
    }

    return null;
};

export default Popup;
