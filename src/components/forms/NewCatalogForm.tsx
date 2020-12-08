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
    onSubmit: (name: string, file: File | null) => void;
}

const NewCatalogForm = ({ onSubmit }: Props) => {
    const [formOpened, setFormOpened] = useState(false);
    const openForm = useCallback(() => setFormOpened(true), []);
    const closeForm = useCallback(() => {
        setFormOpened(false);
        setName("");
    }, []);

    const i18n = useI18n(defaultI18n, "FolderForm");
    const [name, setName] = useState("");
    const selectedFile = useRef<File | null>(null);

    const uploadPhoto = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                selectedFile.current = e.target.files[0];
            }
        },
        []
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            setName(e.target.value),
        []
    );

    const submitForm = useCallback(() => {
        onSubmit(name, selectedFile.current);
        setName("");
        closeForm();
    }, [name, closeForm, onSubmit]);

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
                        />
                        {/* <PhotoField handleChange={uploadPhoto} /> */}
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
