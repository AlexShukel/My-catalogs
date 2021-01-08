import { ipcRenderer } from "electron";

export const deleteFile = (path: string) => {
    ipcRenderer.invoke("DELETE_FILE", path);
};

export const saveFile = async (file: File, path: string): Promise<string> => {
    return await ipcRenderer.invoke(
        "UPLOAD_FILE",
        await file.arrayBuffer(),
        path
    );
};

export const createFolder = async (path: string): Promise<string> => {
    const createdFolder = await ipcRenderer.invoke("CREATE_FOLDER", path);
    return createdFolder;
};

export const deleteFolder = (path: string) => {
    ipcRenderer.invoke("DELETE_FOLDER", path);
};

export const renameFolder = (oldPath: string, newPath: string) => {
    ipcRenderer.invoke("RENAME_FOLDER", oldPath, newPath);
};
