import React, { useCallback, useState } from "react";
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
import usePhotoForm from "../hooks/UsePhotoForm";
import PhotoField from "../fields/PhotoField";
import { PaperComponent } from "./NewCatalogForm";

import css from "./Forms.module.css";

const defaultI18n = {
    newCategory: "New category",
    name: "Name",
    submit: "Submit",
    customIcon: "You can add custom icon",
    category: "Category",
};

interface Props {
    onSubmit: (file: File | null, name: string) => void;
}

const NewFolderForm = ({ onSubmit }: Props) => {
    const [formOpened, setFormOpened] = useState(false);
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
        error,
        setError,
    } = usePhotoForm(onSubmit, () => setFormOpened(false));

    const openForm = useCallback(() => {
        setFormOpened(true);
        setTimeout(() => inputRef.current?.focus());
    }, [inputRef]);

    const closeForm = useCallback(() => {
        setFormOpened(false);
        setName("");
        setImg("");
        setError("");
    }, [setImg, setName, setError]);

    return (
        <React.Fragment>
            <Button onClick={openForm} color="primary" variant="contained">
                {i18n.category}
            </Button>
            <Dialog
                open={formOpened}
                onClose={closeForm}
                PaperComponent={PaperComponent}
            >
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
                        error={!!error}
                        helperText={error}
                    />

                    <div className={css["folder-icon"]}>
                        <Typography>{i18n.customIcon + ":"}</Typography>
                        <PhotoField
                            handleChange={uploadPhoto}
                            handleDrop={handleDrop}
                            handleDelete={handleDelete}
                            img={img}
                            height={50}
                            width={50}
                            editable={true}
                            label=""
                            className={css["folder-icon__icon"]}
                        />
                    </div>
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
        </React.Fragment>
    );
};

export default NewFolderForm;
