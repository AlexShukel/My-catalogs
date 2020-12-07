import React from "react";
import { AppData } from "../../objects/AppData";
import { ipcRenderer } from "electron";

export const CatalogContext = React.createContext(
    {} as AppData & { setValues: (values: AppData) => void }
);

interface ControllerProps {
    children: React.ReactNode;
}

export const CatalogController = ({ children }: ControllerProps) => {
    const [state, setState] = React.useState<AppData>();

    React.useEffect(() => {
        const initialize = async () => {
            const data: AppData = await ipcRenderer.invoke("GET_DATA");
            setState(data);
        };
        initialize();
    }, []);

    const setValues = React.useCallback(
        (values: AppData) => {
            setState(values);
            ipcRenderer.invoke("UPDATE_DATA", JSON.stringify(values));
        },
        [setState]
    );

    return (
        <CatalogContext.Provider
            value={{ catalogs: state?.catalogs ?? [], setValues }}
        >
            {children}
        </CatalogContext.Provider>
    );
};
