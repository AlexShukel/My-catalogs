import { useCallback } from "react";

const usePhotoField = (catalogCoverUploader: (file: File) => void) => {
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                catalogCoverUploader(e.target.files[0]);
            }
        },
        [catalogCoverUploader]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                catalogCoverUploader(e.dataTransfer.files[0]);
            }
        },
        [catalogCoverUploader]
    );

    return { handleDrop, handleChange };
};

export default usePhotoField;
