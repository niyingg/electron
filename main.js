const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

const createWindow = () => {
  console.log(__dirname, "__dirname");
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");
  createWindow();
  app.on("activate", () => {
    console.log(
      BrowserWindow.getAllWindows().length,
      "BrowserWindow.getAllWindows()"
    );
    if (BrowserWindow.getAllWindows().length === 0) {
      // 窗口没有内容的时候，点击应用创建窗口
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  console.log("window-all-closed");
  if (process.platform !== "darwin") {
    app.quit();
  }
});
