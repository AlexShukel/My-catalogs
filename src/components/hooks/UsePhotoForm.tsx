import React, { useCallback, useRef, useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import usePhotoField from "./UsePhotoField";

const defaultI18n = {
    required: "Required",
};

const usePhotoForm = (
    onSubmit: (file: File | null, name: string) => void,
    closeForm: () => void,
    required = true
) => {
    const i18n = useI18n(defaultI18n, "usePhotoForm");
    const inputRef = React.useRef<HTMLInputElement>();
    const selectedFile = useRef<File | null>(null);

    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [img, setImg] = useState("");

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
        if (name || !required) {
            onSubmit(selectedFile.current, name);
            setName("");
            setImg("");
            closeForm();
            selectedFile.current = null;
        } else setError(i18n.required);
    }, [name, closeForm, onSubmit, required, i18n.required]);

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
        name,
        setName,
        error,
        setError,
    };
};

export default usePhotoForm;
