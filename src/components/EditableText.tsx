import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, TextField, TextFieldProps, Typography } from "@material-ui/core";

import { useI18n } from "./i18n/I18nContext";
import EditButton from "./buttons/EditButton";

const defaultI18n = {
    noTextLabel: "There isn't any description",
};

type Props = Omit<TextFieldProps, "onSubmit"> & {
    initialText: string;
    onSubmit: (newText: string) => void;
    index: number;
};

const EditableText = ({ initialText, onSubmit, index, ...other }: Props) => {
    const i18n = useI18n(defaultI18n, "EditableText");
    const inputRef = useRef<HTMLInputElement>();

    const [text, setText] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = useCallback(
        () =>
            setIsEditing((prevValue) => {
                if (prevValue) {
                    onSubmit(text);
                } else {
                    setTimeout(() => inputRef.current?.focus());
                }
                return !prevValue;
            }),
        [onSubmit, text]
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value),
        []
    );

    const handleFocus = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            e.target.selectionStart = e.target.selectionEnd = text.length;
        },
        [text]
    );

    useEffect(() => {
        setText(initialText);
        setIsEditing(false);
    }, [initialText, setIsEditing, index]);

    return (
        <React.Fragment>
            {isEditing ? (
                <TextField
                    value={text}
                    onChange={handleChange}
                    inputRef={inputRef}
                    onFocus={handleFocus}
                    {...other}
                />
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
