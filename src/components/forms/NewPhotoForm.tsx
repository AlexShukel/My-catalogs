import React, { useCallback, useContext } from "react";
import { Button, TextField } from "@material-ui/core";

import PhotoField from "../fields/PhotoField";
import { useI18n } from "../i18n/I18nContext";
import { DialogFormConfig } from "../hooks/useDialogForm";
import { PopupContext } from "../Popups/PopupController";

const defaultI18n = {
    photo: "Photo",
    newPhoto: "New photo",
    description: "Description",
};

interface Props {
    handleSubmit: (file: File | null, description: string) => void;
}

const NewPhotoForm = ({ handleSubmit }: Props) => {
    const { setConfig } = useContext(PopupContext);
    const i18n = useI18n(defaultI18n, "NewPhotoForm");

    const openForm = useCallback(
        () =>
            setConfig({
                title: i18n.newPhoto,
                handleSubmit,
                // eslint-disable-next-line react/display-name
                dialogContent: ({
                    text,
                    handleChange,
                    inputRef,
                    uploadPhoto,
                    handleDrop,
                    handleDelete,
                    img,
                }: DialogFormConfig) => (
                    <React.Fragment>
                        <TextField
                            fullWidth
                            label={i18n.description}
                            value={text}
                            onChange={handleChange}
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
                    </React.Fragment>
                ),
                required: false,
            }),
        [i18n, handleSubmit, setConfig]
    );

    return (
        <Button onClick={openForm} color="primary">
            {i18n.photo}
        </Button>
    );
};

export default NewPhotoForm;
