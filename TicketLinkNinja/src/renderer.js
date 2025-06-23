/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import { sayHello } from './renderer-api/test-renderer-api.js';
sayHello();

console.log('👋 This message is being logged by "renderer.js", included via webpack');

const openBtn = document.getElementById('open-child-window');

if (openBtn) {
  openBtn.addEventListener('click', () => {
    // const ticketWindow= window.electronAPI?.openChildWindow?.('https://www.ticketlink.co.kr/');
    	
    const url = 'https://webhook.site/6c2ffb01-4fcc-4df0-9f0c-8d47202e08d9';
    window.electronAPI?.openChildWindowWithUA?.(url, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36');
  });
}

const checkBtn = document.getElementById('check-child-window');
const statusText = document.getElementById('child-window-status');
const testPreloadBtn = document.getElementById('test-preload-button');

if (testPreloadBtn){
  testPreloadBtn.addEventListener('click', () => {
    window.electronAPI?.testPreload();
  });
}

if (checkBtn && statusText) {
  checkBtn.addEventListener('click', async () => {
    const isOpen = await window.electronAPI?.checkChildWindow?.();
    statusText.textContent = `상태: ${isOpen ? '열림' : '닫힘'}`;
  });
}