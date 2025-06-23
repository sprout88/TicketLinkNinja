/****
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
    const ticket_url = 'https://www.ticketlink.co.kr/';
    
    window.electronAPI?.openChildWindowWithUA?.(ticket_url, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36');
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

const test1Btn = document.getElementById('btn-test1');

if (test1Btn) {
  test1Btn.addEventListener('click', () => {
    const code = `alert('자식 창에서 실행된 코드입니다.');`;
    const console_output = document.getElementById('console-output');
    window.electronAPI?.runJs?.(code).then(result => {
      if (console_output) {
        console_output.textContent = String(result);
      }
    });
  });
}