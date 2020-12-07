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
        const fetchData = async () => {
            const result = await ipcRenderer.invoke("GET_APPDATA");
            setState(result);
        };

        fetchData();
    }, []);

    const setValues = React.useCallback(
        (values: AppData) => setState(values),
        []
    );

    return (
        <CatalogContext.Provider
            value={{ catalogs: state?.catalogs ?? [], setValues }}
        >
            {children}
        </CatalogContext.Provider>
    );
};
