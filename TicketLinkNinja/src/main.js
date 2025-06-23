const { app, BrowserWindow } = require('electron');
const path = require('node:path');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

const { ipcMain } = require('electron');

// main-api
const handleOpenChildWindow = require('./main-api/open-child-window');
const { runJs } = require('./main-api/run-js');
const { setChildWindow, getChildWindow } = require('./main-api/main-store');

// ipc event listeners
ipcMain.on('open-child-window', handleOpenChildWindow);

ipcMain.on('open-child-window-with-ua', (event, { url, userAgent }) => {
  const newWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
    },
  });

  setChildWindow(newWindow);

  newWindow.webContents.setUserAgent(userAgent);
  newWindow.loadURL(url);
});

ipcMain.handle('run-js', async (event, script) => {
  return runJs(getChildWindow(), script);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
