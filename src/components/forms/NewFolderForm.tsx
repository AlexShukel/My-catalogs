import React, { useCallback, useContext } from "react";
import { Button, TextField, Typography } from "@material-ui/core";

import { useI18n } from "../i18n/I18nContext";
import { DialogFormConfig } from "../hooks/useDialogForm";
import PhotoField from "../fields/PhotoField";
import { PopupContext } from "../Popups/PopupController";

import css from "./Forms.module.css";

const defaultI18n = {
    newCategory: "New category",
    name: "Name",
    customIcon: "You can add custom icon",
    category: "Category",
};

interface Props {
    handleSubmit: (file: File | null, name: string) => void;
}

const NewFolderForm = ({ handleSubmit }: Props) => {
    const { setConfig } = useContext(PopupContext);
    const i18n = useI18n(defaultI18n, "NewFolderForm");

    const openForm = useCallback(
        () =>
            setConfig({
                title: i18n.newCategory,
                handleSubmit,
                // eslint-disable-next-line react/display-name
                dialogContent: ({
                    text,
                    handleChange,
                    handleKeyPress,
                    inputRef,
                    error,
                    uploadPhoto,
                    handleDrop,
                    handleDelete,
                    img,
                }: DialogFormConfig) => (
                    <React.Fragment>
                        <TextField
                            fullWidth
                            label={i18n.name}
                            value={text}
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
                    </React.Fragment>
                ),
            }),
        [i18n, handleSubmit, setConfig]
    );

    return (
        <Button onClick={openForm} color="primary" variant="contained">
            {i18n.category}
        </Button>
    );
};

export default NewFolderForm;
