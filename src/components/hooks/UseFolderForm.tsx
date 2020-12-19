import React, { useCallback, useRef, useState } from "react";
import usePhotoField from "./UsePhotoField";

const useFolderForm = (
    onSubmit: (file: File | null, name: string) => void,
    closeForm: () => void
) => {
    const inputRef = React.useRef<HTMLInputElement>();
    const selectedFile = useRef<File | null>(null);

    const [name, setName] = useState("");
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
        onSubmit(selectedFile.current, name);
        setName("");
        setImg("");
        closeForm();
        selectedFile.current = null;
    }, [name, closeForm, onSubmit]);

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
    };
};

export default useFolderForm;
