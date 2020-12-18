import { ipcRenderer } from "electron";

export const deleteCatalogCover = (path: string) => {
    ipcRenderer.invoke("DELETE_CATALOG_COVER", path);
};

export const saveCatalogCover = async (
    file: File,
    name: string
): Promise<string> => {
    return await ipcRenderer.invoke(
        "UPLOAD_CATALOG_COVER",
        name,
        await file.arrayBuffer(),
        file.name
    );
};

export const createCatalogFolder = async (name: string): Promise<string> => {
    const createdFolder = await ipcRenderer.invoke("NEW_CATALOG", name);
    return createdFolder;
};

export const deleteCatalog = (name: string) => {
    ipcRenderer.invoke("DELETE_CATALOG", name);
};
