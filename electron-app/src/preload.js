const { contextBridge, ipcRenderer } = require("electron");

// Экспортируем только необходимые функции
contextBridge.exposeInMainWorld("electron", {
  closeApp: () => ipcRenderer.send("close-app"),
  getCompInfo: (email) => ipcRenderer.send("get-comp-info", email),
  on: (event, listener) => ipcRenderer.on(event, listener),
  removeListener: (event) => ipcRenderer.removeListener(event),
});
