const { BrowserWindow } = require('electron');

module.exports = (event, url) => {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      contextIsolation: true,
    }
  });

  win.loadURL(url);
};