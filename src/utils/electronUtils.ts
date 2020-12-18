import { ipcRenderer } from "electron";

export const deleteCatalogCover = (path: string) => {
    ipcRenderer.invoke("DELETE_CATALOG_COVER", path);
};

export const uploadCatalogCover = async (file: File | null, name: string) => {
    if (file) {
        return await ipcRenderer.invoke(
            "UPLOAD_CATALOG_COVER",
            name,
            await file.arrayBuffer(),
            file.name
        );
    }
    return "";
};

export const deleteCatalog = (name: string) => {
    ipcRenderer.invoke("DELETE_CATALOG", name);
};
