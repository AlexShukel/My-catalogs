import React, { useCallback, useRef, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Icon,
    Paper,
    PaperProps,
    TextField,
    Typography,
} from "@material-ui/core";
import Draggable from "react-draggable";

import { useI18n } from "../i18n/I18nContext";
import PhotoField from "../fields/PhotoField";
import usePhotoField from "../hooks/UsePhotoField";

import css from "./NewCatalogForm.module.css";

export const PaperComponent = (props: PaperProps) => (
    <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
    >
        <Paper {...props} />
    </Draggable>
);

const defaultI18n = {
    newCatalog: "New catalog",
    withCategories: "With categories",
    name: "Name",
    required: "Required",
    createNewCatalog: "Create new catalog",
};

interface Props {
    onSubmit: (file: File | null, catalogName: string) => void;
}

const NewCatalogForm = ({ onSubmit }: Props) => {
    const inputRef = React.useRef<HTMLInputElement>();

    const [formOpened, setFormOpened] = useState(false);
    const openForm = useCallback(() => {
        setFormOpened(true);
        setTimeout(() => inputRef.current?.focus());
    }, []);
    const closeForm = useCallback(() => {
        setFormOpened(false);
        setName("");
    }, []);

    const i18n = useI18n(defaultI18n, "FolderForm");
    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const selectedFile = useRef<File | null>(null);

    const { handleDrop, handleChange: uploadPhoto } = usePhotoField(
        (file: File) => {
            selectedFile.current = file;

            setImg(URL.createObjectURL(file));
        }
    );

    const handleDelete = useCallback(() => {
        setImg("");
        selectedFile.current = null;
    }, []);

    const submitForm = useCallback(() => {
        onSubmit(selectedFile.current, name);
        setName("");
        setImg("");
        closeForm();
        selectedFile.current = null;
    }, [name, closeForm, onSubmit]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            setName(e.target.value),

        []
    );

    const handleKeyPress = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter") submitForm();
        },
        [submitForm]
    );

    return (
        <React.Fragment>
            <Box className={css["add-btn"]}>
                <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<Icon>add</Icon>}
                    onClick={openForm}
                >
                    {i18n.createNewCatalog}
                </Button>
            </Box>
            {formOpened && (
                <Dialog
                    open={true}
                    PaperComponent={PaperComponent}
                    onClose={closeForm}
                >
                    <DialogTitle
                        disableTypography
                        id="draggable-dialog-title"
                        className={css["draggable"]}
                    >
                        <Typography variant="h5">{i18n.newCatalog}</Typography>
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
                            submit
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </React.Fragment>
    );
};

export default NewCatalogForm;
