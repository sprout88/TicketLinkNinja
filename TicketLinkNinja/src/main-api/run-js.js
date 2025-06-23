function runJs(win, script) {
  if (win && !win.isDestroyed()) {
    return win.webContents.executeJavaScript(script);
  }
  return Promise.reject(new Error('Invalid or closed window'));
}

module.exports = { runJs };
