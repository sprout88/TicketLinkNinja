const windows = {
  child: null,
};

module.exports = {
  setChildWindow(win) {
    windows.child = win;
  },
  getChildWindow() {
    return windows.child;
  },
  clearChildWindow() {
    windows.child = null;
  },
};