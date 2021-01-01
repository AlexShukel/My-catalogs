import { TextField } from "@material-ui/core";
import React from "react";

import PhotoField from "../fields/PhotoField";
import { DialogFormConfig } from "../hooks/useDialogForm";

// eslint-disable-next-line react/display-name
const NewCatalogForm = (name: string) => ({
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
            label={name}
            value={text}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            inputRef={inputRef}
            error={!!error}
            helperText={error}
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
);

export default NewCatalogForm;
