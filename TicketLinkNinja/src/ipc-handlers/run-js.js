function runJs(win, script) {
  if (win && !win.isDestroyed()) {
    return win.webContents.executeJavaScript(script).then(result => {
      if (typeof result === 'undefined') {
        return '[RESULT] success (no return value)';
      }
      return `[RESULT] ${result}`;
    });
  }
  return Promise.resolve('[SKIPPED] no window');
}

module.exports = { runJs };
