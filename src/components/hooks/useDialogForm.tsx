import React, { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import usePhotoField from "./usePhotoField";

const defaultI18n = {
    required: "Required",
};

const useDialogForm = (
    onSubmit: (file: File | null, text: string) => void,
    dismiss: () => void,
    required = true
) => {
    const i18n = useI18n(defaultI18n, "useDialogForm");
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const selectedFile = useRef<File | null>(null);

    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [img, setImg] = useState("");

    const resetValues = useCallback(() => {
        setText("");
        setError("");
        setImg("");
    }, []);

    const closeForm = useCallback(() => {
        resetValues();
        dismiss();
    }, [resetValues, dismiss]);

    const { handleDrop, handleChange: uploadPhoto } = usePhotoField(
        (file: File) => {
            selectedFile.current = file;

            setImg(URL.createObjectURL(file));
        }
    );

    const handleDelete = useCallback(() => {
        selectedFile.current = null;

        setImg("");
    }, []);

    const submitForm = useCallback(() => {
        if (text || !required) {
            onSubmit(selectedFile.current, text);
            resetValues();
            dismiss();
            selectedFile.current = null;
        } else setError(i18n.required);
    }, [text, dismiss, onSubmit, required, i18n.required, resetValues]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            setText(e.target.value),
        []
    );

    const handleKeyPress = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter") submitForm();
        },
        [submitForm]
    );

    useEffect(() => {
        setTimeout(() => inputRef.current?.focus());
    }, []);

    return {
        inputRef,
        img,
        handleDrop,
        uploadPhoto,
        handleDelete,
        submitForm,
        handleChange,
        handleKeyPress,
        text,
        error,
        closeForm,
    };
};

export type DialogFormConfig = ReturnType<typeof useDialogForm>;

export default useDialogForm;
