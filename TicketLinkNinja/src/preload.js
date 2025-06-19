// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openUrl: (url) => ipcRenderer.send('open-url', url),
  testPreload: () => {
    console.log('👋 preload 연결 테스트 성공!');
    alert('👋 Preload!!!');
  },
  openChildWindow: (url) => ipcRenderer.send('open-child-window', url),
});
