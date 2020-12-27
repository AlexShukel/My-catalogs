import React, { useCallback, useRef, useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import usePhotoField from "./UsePhotoField";

const defaultI18n = {
    required: "Required",
};

const useDialogForm = (
    onSubmit: (file: File | null, text: string) => void,
    closeForm: () => void,
    required = true
) => {
    const i18n = useI18n(defaultI18n, "useDialogForm");
    const inputRef = React.useRef<HTMLInputElement>();
    const selectedFile = useRef<File | null>(null);

    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [img, setImg] = useState("");

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
            setText("");
            setImg("");
            closeForm();
            selectedFile.current = null;
        } else setError(i18n.required);
    }, [text, closeForm, onSubmit, required, i18n.required]);

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
    return {
        inputRef,
        img,
        setImg,
        handleDrop,
        uploadPhoto,
        handleDelete,
        submitForm,
        handleChange,
        handleKeyPress,
        text,
        setText,
        error,
        setError,
    };
};

export type DialogFormConfig = ReturnType<typeof useDialogForm>;

export default useDialogForm;
