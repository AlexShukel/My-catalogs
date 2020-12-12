import { BrowserWindow, app, ipcMain } from "electron";
import isDev from "electron-is-dev";
import path from "path";
import fs from "fs";
import util from "util";
import { AppData } from "./objects/AppData";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const removeDir = util.promisify(fs.rmdir);

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
            : `file://${path.resolve(
                  __dirname,
                  "..",
                  "renderer",
                  "index.html"
              )}`
    );

    win.on("closed", () => {
        win = null;
    });
}

app.on("ready", () => {
    createWindow();
});

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
const JSON_FILE = "data.json";

if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, {
        recursive: true,
    });
    fs.mkdirSync(path.join(storagePath, "catalogs"), {
        recursive: true,
    });
}

const dataPath = path.join(storagePath, JSON_FILE);

ipcMain.handle("GET_DATA", () => {
    if (fs.existsSync(dataPath)) {
        return fs.readFileSync(dataPath).toString();
    } else {
        const emptyData: AppData = {
            catalogs: [],
        };
        const stringifiedEmptyData = JSON.stringify(emptyData).toString();
        fs.writeFileSync(dataPath, stringifiedEmptyData);
        return stringifiedEmptyData;
    }
});

ipcMain.handle("UPDATE_DATA", (_event, data: string) => {
    fs.writeFileSync(dataPath, data);
});

ipcMain.handle(
    "UPLOAD_CATALOG_COVER",
    async (event, catalogName: string, buffer: Buffer, fileName: string) => {
        const filePath = path.join(
            storagePath,
            "catalogs",
            catalogName,
            fileName
        );
        await writeFile(filePath, Buffer.from(buffer));
        return filePath;
    }
);

ipcMain.handle("NEW_CATALOG", (_event, name: string) => {
    const targetPath = path.join(storagePath, "catalogs", name);

    if (fs.existsSync(targetPath)) {
        return false;
    }

    fs.mkdirSync(targetPath);
    return true;
});

ipcMain.handle("DELETE_CATALOG", async (_event, name: string) => {
    const targetPath = path.join(storagePath, "catalogs", name);

    if (!fs.existsSync(targetPath))
        console.error("DELETE_CATALOG - Catalog doesn't exists");

    await removeDir(targetPath);
});
