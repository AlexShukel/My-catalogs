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

export const createFolder = async (path: string): Promise<string> => {
    const createdFolder = await ipcRenderer.invoke("CREATE_FOLDER", path);
    return createdFolder;
};

export const deleteFolder = (path: string) => {
    ipcRenderer.invoke("DELETE_FOLDER", path);
};
