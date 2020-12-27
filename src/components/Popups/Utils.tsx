import React from "react";

import ConfirmPopup from "./ConfirmPopup";
import { CommonPopupConfig } from "./PopupData";

export const showConfirmPopup = (
    message: string,
    setPopupConfig: (config: CommonPopupConfig) => void,
    dismiss: () => void,
    title: string | undefined = undefined
): Promise<boolean> => {
    return new Promise((resolve: (out: boolean) => void) => {
        const handleResolve = (out: boolean) => {
            resolve(out);
            dismiss();
        };

        setPopupConfig({
            dialogContent: (
                <ConfirmPopup
                    title={title}
                    message={message}
                    resolve={handleResolve}
                />
            ),
        });
    });
};
