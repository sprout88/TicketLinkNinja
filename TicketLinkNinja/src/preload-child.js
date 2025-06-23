// Remove or spoof navigator.webdriver
Object.defineProperty(navigator, 'webdriver', { get: () => false });

// Remove Electron/Node.js traces
try {
  delete window.require;
  delete window.process;
  delete window.module;
} catch (e) {
  console.warn('Failed to clean up Electron traces:', e);
}

// Spoof navigator properties
Object.defineProperty(navigator, 'languages', {
  get: () => ['ko-KR', 'ko'],
});

Object.defineProperty(navigator, 'plugins', {
  get: () => [{ name: 'Chrome PDF Plugin' }],
});

// Fake chrome.runtime
window.chrome = { runtime: {} };

// Preload alert (for debugging)
alert('✅ preload-child.js executed');