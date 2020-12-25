import { useState, useCallback, useRef } from "react";

export const useConfirmPopup = () => {
    const [confirmPopupOpened, setConfirmPopupOpened] = useState(false);
    const closeConfirmPopup = useCallback(
        () => setConfirmPopupOpened(false),
        []
    );

    const handleConfirm = useRef<() => void>(() => {
        //
    });

    return {
        confirmPopupOpened,
        setConfirmPopupOpened,
        closeConfirmPopup,
        handleConfirm,
    };
};
