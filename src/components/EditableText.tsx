import React, { useCallback, useState } from "react";
import { Box, TextField, TextFieldProps, Typography } from "@material-ui/core";

import { useI18n } from "./i18n/I18nContext";
import EditButton from "./buttons/EditButton";
import useEditMode from "./hooks/UseEditMode";

const defaultI18n = {
    noTextLabel: "There isn't any description",
};

type Props = Omit<TextFieldProps, "onSubmit"> & {
    initialText: string;
    onSubmit: (newText: string) => void;
};

const EditableText = ({ initialText, onSubmit, ...other }: Props) => {
    const i18n = useI18n(defaultI18n, "EditableText");

    const [text, setText] = useState(initialText);
    const { isEditing, toggleEditing } = useEditMode(() => onSubmit(text));

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value),
        []
    );

    return (
        <React.Fragment>
            {isEditing ? (
                <TextField value={text} onChange={handleChange} {...other} />
            ) : (
                <Typography>{text || <i>{i18n.noTextLabel}</i>}</Typography>
            )}

            <Box className="button-margin">
                <EditButton
                    isEditing={isEditing}
                    toggleEditing={toggleEditing}
                />
            </Box>
        </React.Fragment>
    );
};

export default EditableText;
