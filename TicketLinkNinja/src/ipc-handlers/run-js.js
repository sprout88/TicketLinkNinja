function runJs(win, script) {
  if (win && !win.isDestroyed()) {
    return win.webContents.executeJavaScript(script);
  }
  return Promise.resolve('[SKIPPED] no window');
}

module.exports = { runJs };
