import { useCallback } from "react";

const usePhotoField = (photoUploader: (file: File) => void) => {
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                photoUploader(e.target.files[0]);
            }
        },
        [photoUploader]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                photoUploader(e.dataTransfer.files[0]);
            }
        },
        [photoUploader]
    );

    return { handleDrop, handleChange };
};

export default usePhotoField;
