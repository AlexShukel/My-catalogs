import React, { useCallback, useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    Typography,
    DialogContent,
    TextField,
    DialogActions,
} from "@material-ui/core";

import PhotoField from "../fields/PhotoField";
import { PaperComponent } from "./NewCatalogForm";
import { useI18n } from "../i18n/I18nContext";
import usePhotoForm from "../hooks/UsePhotoForm";

import css from "./Forms.module.css";

const defaultI18n = {
    photo: "Photo",
    newPhoto: "New photo",
    submit: "Submit",
    description: "Description",
};

interface Props {
    onSubmit: (file: File | null, description: string) => void;
}

const NewPhotoForm = ({ onSubmit }: Props) => {
    const [formOpened, setFormOpened] = useState(false);
    const i18n = useI18n(defaultI18n, "NewPhotoForm");

    const {
        handleChange: handleDescriptionChange,
        handleDelete,
        handleDrop,
        img,
        inputRef,
        name: description,
        setImg,
        setName: setDescription,
        submitForm,
        uploadPhoto,
    } = usePhotoForm(onSubmit, () => setFormOpened(false), false);

    const openForm = useCallback(() => {
        setFormOpened(true);
        setTimeout(() => inputRef.current?.focus());
    }, [inputRef]);

    const closeForm = useCallback(() => {
        setFormOpened(false);
        setImg("");
        setDescription("");
    }, [setImg, setDescription]);

    return (
        <React.Fragment>
            <Button onClick={openForm} color="primary">
                {i18n.photo}
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
                    <Typography variant="h5">{i18n.newPhoto}</Typography>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label={i18n.description}
                        value={description}
                        onChange={handleDescriptionChange}
                        multiline
                        inputRef={inputRef}
                    />

                    <PhotoField
                        handleChange={uploadPhoto}
                        handleDrop={handleDrop}
                        handleDelete={handleDelete}
                        img={img}
                        height={300}
                        width={400}
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
        </React.Fragment>
    );
};

export default NewPhotoForm;
