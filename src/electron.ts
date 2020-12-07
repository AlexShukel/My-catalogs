import { BrowserWindow, app, ipcMain } from "electron";
import isDev from "electron-is-dev";
import path from "path";
import fs from "fs";
import { FileInfo } from "./objects/FileInfo";

let win: BrowserWindow | null = null;
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    win.loadURL(
        isDev
            ? "http://localhost:3000/"
            : `file://${path.resolve(__dirname, "..", "dist", "index.html")}`
    );

    win.on("closed", () => {
        win = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});

const storagePath = path.resolve(__dirname, "PHOTO_STORAGE");

if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, {
        recursive: true,
    });
}

ipcMain.handle(
    "UPLOAD_PHOTO",
    (event: unknown, photoPath: string, name: string, appPath: string) => {
        const destPath = path.join(storagePath, appPath);
        fs.copyFile(photoPath, destPath, (err) => {
            if (err) throw err;
            console.log("Uploaded!");
        });
    }
);

ipcMain.handle(
    "CREATE_CATALOG",
    (
        event: unknown,
        name: string,
        { path: coverPath, name: coverName }: FileInfo
    ) => {
        const catalogPath = path.join(storagePath, name);
        let newCoverPath = "";
        fs.mkdir(catalogPath, (err) => {
            if (err) throw err;
            console.log("Created catalog!");
        });
        if (coverPath) {
            newCoverPath = path.join(catalogPath, coverName);
            fs.copyFile(coverPath, newCoverPath, (err) => {
                if (err) throw err;
                console.log("Created catalog cover!");
            });
        }
        return newCoverPath;
    }
);
