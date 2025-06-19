const { BrowserWindow } = require('electron');
const store = require('./store');

module.exports = (event, url) => {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      contextIsolation: true,
    }
  });

  win.loadURL(url);
  store.setChildWindow(win);
  win.on('closed', () => {
    console.log("Child Closed...");
    store.clearChildWindow();
  });
};