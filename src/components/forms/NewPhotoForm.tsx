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
    name: "Name",
    submit: "Submit",
    description: "Description",
};

interface Props {
    onSubmit: (file: File | null, name: string, description: string) => void;
}

const NewPhotoForm = ({ onSubmit }: Props) => {
    const [formOpened, setFormOpened] = useState(false);
    const i18n = useI18n(defaultI18n, "NewFolderForm");
    const [description, setDescription] = useState("");

    const handleDescriptionChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value),
        []
    );

    const submit = useCallback(
        (file: File | null, name: string) => {
            onSubmit(file, name, description);
            setDescription("");
        },
        [description, onSubmit]
    );

    const {
        handleChange,
        handleDelete,
        handleDrop,
        img,
        inputRef,
        name,
        setImg,
        setName,
        submitForm,
        uploadPhoto,
    } = usePhotoForm(submit, () => setFormOpened(false));

    const openForm = useCallback(() => {
        setFormOpened(true);
        setTimeout(() => inputRef.current?.focus());
    }, [inputRef]);

    const closeForm = useCallback(() => {
        setFormOpened(false);
        setName("");
        setImg("");
        setDescription("");
    }, [setImg, setName]);

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
                        label={i18n.name}
                        value={name}
                        onChange={handleChange}
                        inputRef={inputRef}
                    />

                    <TextField
                        fullWidth
                        label={i18n.description}
                        value={description}
                        onChange={handleDescriptionChange}
                        multiline
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
