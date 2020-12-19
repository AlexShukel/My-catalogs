import { BrowserWindow, app, ipcMain } from "electron";
// import isDev from "electron-is-dev";
import rimraf from "rimraf";
import path from "path";
import fs from "fs";
import util from "util";
import { AppData } from "./objects/AppData";

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
        `file://${path.resolve(__dirname, "..", "renderer", "index.html")}`
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

const storagePath = path.resolve(
    __dirname,
    // TODO use this in prod
    // "..",
    // "..",
    // "..",
    // "..",
    "PHOTO_STORAGE"
);
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
    "UPLOAD_FILE",
    async (_event, buffer: Buffer, filePath: string) => {
        const targetPath = path.join(storagePath, filePath);
        await writeFile(targetPath, Buffer.from(buffer));
        return targetPath;
    }
);

ipcMain.handle("DELETE_CATALOG_COVER", (_event, filePath: string) => {
    fs.unlink(filePath, (err) => {
        if (err) console.error(err);
        else console.log("Catalog cover deleted");
    });
});

// Returns false if folder exists and true if folder created
ipcMain.handle("CREATE_FOLDER", (_event, folderPath: string) => {
    const targetPath = path.join(storagePath, folderPath);

    if (fs.existsSync(targetPath)) {
        return false;
    }

    fs.mkdirSync(targetPath);
    return true;
});

ipcMain.handle("DELETE_FOLDER", (_event, folderPath: string) => {
    const targetPath = path.join(storagePath, folderPath);

    if (!fs.existsSync(targetPath))
        console.error("DELETE_CATALOG - Catalog doesn't exists");

    rimraf(targetPath, (err) => {
        if (err) console.error(err);
        console.log("Catalog deleted");
    });
});
