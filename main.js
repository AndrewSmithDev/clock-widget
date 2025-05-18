const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 125,
    transparent: true,
    frame: false,
    hasShadow: false,
    skipTaskbar: true,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile("index.html");

  // https://github.com/electron/electron/issues/39959
  win.on("blur", () => {
    win.setResizable(true);
    win.setResizable(false);
  });

  const tray = new Tray(path.join(__dirname, "icon.png"));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show",
      click: () => win.focus(),
    },
    {
      label: "Quit",
      click: () => {
        tray?.destroy();
        app.quit();
      },
    },
  ]);

  tray.setToolTip("My Electron App");
  tray.setContextMenu(contextMenu);
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
