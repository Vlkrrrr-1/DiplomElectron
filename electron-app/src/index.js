const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const si = require("systeminformation");
const axios = require("axios");

if (require("electron-squirrel-startup")) app.quit();

// Вимикаємо апаратне прискорення
app.disableHardwareAcceleration();

// За потреби явно вказуємо директорію userData (щоб уникнути кеш-помилок)
app.setPath("userData", path.join(__dirname, "userdata"));

let mainWindow;
let isStarted = false;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    fullscreen: true,
    icon: path.join(__dirname, "images", "1.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.setMenuBarVisibility(false);

  // Продакшн
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Закриття вікна — просто ховаємо його
  mainWindow.on("close", (event) => {
    event.preventDefault();
    mainWindow.hide();
    console.log("Вікно приховано. Програма працює у фоні.");
  });

  // Обробка "закриття" з рендерера
  ipcMain.on("close-app", () => {
    console.log("Отримано команду приховати вікно.");
    mainWindow.hide();
  });
};

// Створення вікна при запуску
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else {
      mainWindow.show();
    }
  });
});

// Запобігання закриттю програми при закритті вікон
app.on("window-all-closed", (event) => {
  event.preventDefault(); // не дозволяємо завершити роботу
});

// --- IPC слухач ---
ipcMain.on("get-comp-info", (event, email) => {
  if (isStarted) return; // Щоб уникнути дублювання таймерів
  isStarted = true;

  setInterval(async () => {
    try {
      const compInfo = await getCompInfo();
      const date = new Date();
      console.log(compInfo);
      if (compInfo) {
        await axios.post("http://localhost:5000/resources/addResources", {
          ...compInfo,
          email,
          date,
        });
        console.log("Дані надіслано:", { email, date });
      }
    } catch (error) {
      console.error("Помилка при надсиланні даних:", error.message);
    }
  }, 60000);
});

// --- Отримання системної інформації ---
const toGb = (bytes) => parseFloat((bytes / 1e9).toFixed(2));

const getCompInfo = async () => {
  try {
    const system = await si.system();
    const os = await si.osInfo();
    return {
      deviceName: `${os.hostname} (${system.manufacturer})`,
      disk: await getDiskInfo(),
      cpuLoad: await getCPULoad(),
      cpuTemperature: await getCpuTemperature(),
      battery: await getBatteryInfo(),
      ramLoad: await getRamLoad(),
    };
  } catch (error) {
    console.error("Помилка при зборі даних:", error.message);
    return null;
  }
};

const getDiskInfo = async () => {
  try {
    const data = await si.fsSize();
    return data.map((disk) => ({
      fs: disk.fs,
      totalMemory: toGb(disk.size),
      usedMemory: toGb(disk.used),
      remainingMemory: toGb(disk.available),
    }));
  } catch (error) {
    console.error("Помилка диску:", error.message);
    return [];
  }
};

const getCPULoad = async () => {
  try {
    const data = await si.currentLoad();
    return parseFloat(data.currentLoad.toFixed(2));
  } catch (error) {
    console.error("Помилка CPU:", error.message);
    return 0;
  }
};

const getCpuTemperature = async () => {
  try {
    const data = await si.cpuTemperature();
    return data.main !== null ? data.main : 0;
  } catch (error) {
    console.error("Помилка температури CPU:", error.message);
    return 0;
  }
};

const getBatteryInfo = async () => {
  try {
    const battery = await si.battery();
    return battery.percent;
  } catch (error) {
    console.error("Помилка батареї:", error.message);
    return 0;
  }
};

const getRamLoad = async () => {
  try {
    const memory = await si.mem();
    return {
      totalMemory: toGb(memory.total),
      usedMemory: toGb(memory.used),
      remainingMemory: toGb(memory.total - memory.used),
    };
  } catch (error) {
    console.error("Помилка RAM:", error.message);
    return { totalMemory: 0, usedMemory: 0, remainingMemory: 0 };
  }
};
