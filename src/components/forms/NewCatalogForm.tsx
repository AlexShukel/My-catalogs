import React, { useCallback, useState } from "react";
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
import useFolderForm from "../hooks/UseFolderForm";

import css from "./Forms.module.css";

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
    submit: "Submit",
};

interface Props {
    onSubmit: (file: File | null, catalogName: string) => void;
}

const NewCatalogForm = ({ onSubmit }: Props) => {
    const [formOpened, setFormOpened] = useState(false);

    const i18n = useI18n(defaultI18n, "FolderForm");

    const {
        setName,
        setImg,
        inputRef,
        handleChange,
        handleDelete,
        handleDrop,
        handleKeyPress,
        img,
        name,
        submitForm,
        uploadPhoto,
    } = useFolderForm(onSubmit, () => setFormOpened(false));

    const openForm = useCallback(() => {
        setFormOpened(true);
        setTimeout(() => inputRef.current?.focus());
    }, [inputRef]);

    const closeForm = useCallback(() => {
        setFormOpened(false);
        setName("");
        setImg("");
    }, [setImg, setName]);

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
            <Dialog
                open={formOpened}
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
                        {i18n.submit}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default NewCatalogForm;
