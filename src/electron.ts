import { BrowserWindow, app, ipcMain } from "electron";
import isDev from "electron-is-dev";
import path from "path";
import fs from "fs";
import util from "util";

const readFile = util.promisify(fs.readFile);

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

const storagePath = path.resolve(__dirname, "PHOTO_STORAGE");

app.on("ready", () => {
    if (!fs.existsSync(storagePath)) {
        fs.mkdirSync(storagePath, {
            recursive: true,
        });
        fs.mkdirSync(path.join(storagePath, "catalogs"), {
            recursive: true,
        });
    }
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

ipcMain.handle("TEST", async (event) => {
    let base64: string = "";
    const buffer = await readFile(
        path.resolve(
            storagePath,
            "do-you-think-you-re-happy-jgdbfiey-9bb0198eeccd0a3c3c13aed064e2e2b3.jpg"
        ),
        {
            encoding: "base64",
        }
    );
    if (buffer) base64 = buffer;
    return base64;
});

ipcMain.handle("NEW_CATALOG", (event, name: string) => {
    const targetPath = path.join(storagePath, "catalogs", name);

    if (fs.existsSync(targetPath)) {
        return false;
    }

    fs.mkdirSync(targetPath);

    return true;
});
