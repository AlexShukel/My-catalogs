import React, { useCallback } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@material-ui/core";

import { useI18n } from "../i18n/I18nContext";
import useFolderForm from "../hooks/UseFolderForm";
import PhotoField from "../fields/PhotoField";

import css from "./Forms.module.css";

const defaultI18n = {
    newCategory: "New category",
    name: "Name",
    submit: "Submit",
};

interface Props {
    open: boolean;
    onClose: () => void;
    id: number;
    onSubmit: (file: File | null, name: string) => void;
}

const NewFolderForm = ({ id, onClose, onSubmit, open }: Props) => {
    const i18n = useI18n(defaultI18n, "NewFolderForm");

    const {
        handleChange,
        handleDelete,
        handleDrop,
        handleKeyPress,
        img,
        inputRef,
        name,
        setImg,
        setName,
        submitForm,
        uploadPhoto,
    } = useFolderForm(onSubmit, onClose);

    const closeForm = useCallback(() => {
        onClose();
        setName("");
        setImg("");
    }, [onClose, setName, setImg]);

    return (
        <Dialog open={open} onClose={closeForm}>
            <DialogTitle
                disableTypography
                id="draggable-dialog-title"
                className={css["draggable"]}
            >
                <Typography variant="h5">{i18n.newCategory}</Typography>
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label={i18n.name}
                    value={name}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    inputRef={inputRef}
                />
                <PhotoField
                    handleChange={uploadPhoto}
                    handleDrop={handleDrop}
                    handleDelete={handleDelete}
                    img={img}
                    height={50}
                    width={50}
                    editable={true}
                />
            </DialogContent>
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

export default NewFolderForm;
