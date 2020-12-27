import React, { useCallback, useState } from "react";
import { PopupConfig } from "./PopupData";

interface PopupContextType {
    config: PopupConfig | null;
    setConfig: (config: PopupConfig) => void;
    dismiss: () => void;
}

export const PopupContext = React.createContext({} as PopupContextType);

interface Props {
    children: React.ReactNode;
}

const PopupController = ({ children }: Props) => {
    const [config, setStateConfig] = useState<PopupConfig | null>(null);

    const setConfig = useCallback(
        (config: PopupConfig) => setStateConfig(config),
        []
    );

    const dismiss = useCallback(() => setStateConfig(null), []);

    return (
        <PopupContext.Provider value={{ setConfig, dismiss, config }}>
            {children}
        </PopupContext.Provider>
    );
};

export default PopupController;
