import si from "systeminformation";

export const getCompInfo = async () => {
  try {
    const compInfo = {
      disk: {
        totalMemory: 0,
        usedMemory: 0,
        remainingMemory: 0,
      },
      cpuLoad: 0,
      cpuTemperature: 0,
      battery: {
        chargeLevel: 0,
      },
      ramLoad: {
        totalMemory: 0,
        usedMemory: 0,
        remainingMemory: 0,
      },
    };
    const cpuLoad = await getCPULoad();
    if (cpuLoad) compInfo.cpuLoad = cpuLoad;
    const cpuTemperature = await getCpuTemperature();
    if (cpuTemperature) compInfo.cpuTemperature = cpuTemperature;
    const battery = await getBatteryInfo();
    if (battery) compInfo.battery = battery;
    const memory = await getRamLoad();
    if (memory) compInfo.ramLoad = memory;
    const disk = await getDiskInfo();
    if (disk) compInfo.disk = disk;
    return compInfo;
  } catch (error) {}
};

const getDiskInfo = async () => {
  try {
    const diskNeedInfo = {
      totalMemory: 0,
      usedMemory: 0,
      remainingMemory: 0,
    };
    const data = await si.fsSize();
    data.forEach((disk) => {
      diskInfo.diskSize += disk.size;
      diskInfo.diskAvailable += disk.available;
    });
    diskNeedInfo.totalMemory = parseFloat(
      (diskInfo.diskSize / (1024 * 1024 * 1024)).toFixed(2)
    );
    diskNeedInfo.usedMemory = parseFloat(
      (
        (diskInfo.diskSize - diskInfo.diskAvailable) /
        (1024 * 1024 * 1024)
      ).toFixed(2)
    );
    diskNeedInfo.remainingMemory = parseFloat(
      (diskInfo.diskAvailable / (1024 * 1024 * 1024)).toFixed(2)
    );
    return diskNeedInfo;
  } catch (error) {
    console.error("Ошибка получения данных о диске:", error);
  }
};

const getCPULoad = async () => {
  try {
    const data = await si.currentLoad();
    return parseFloat(data.currentLoad.toFixed(2));
  } catch (error) {
    console.error("Ошибка получения данных о процессоре:", error);
  }
};

const getRamLoad = async () => {
  try {
    const memory = await si.mem();
    const memoryNeedInfo = {
      totalMemory: 0,
      usedMemory: 0,
      remainingMemory: 0,
    };
    memoryNeedInfo.totalMemory = parseFloat((memory.total / 1e9).toFixed(2));
    memoryNeedInfo.usedMemory = parseFloat((memory.used / 1e9).toFixed(2));
    memoryNeedInfo.remainingMemory = parseFloat(
      ((memory.total - memory.used) / 1e9).toFixed(2)
    );
    return memoryNeedInfo;
  } catch (error) {
    console.error("Ошибка получения данных о памяти:", error);
  }
};

const getCpuTemperature = async () => {
  try {
    const data = await si.cpuTemperature();
    let temperatureInfo = 0;
    if (data.main === null) {
      temperatureInfo = 0;
    } else {
      temperatureInfo = data.main;
    }
    return temperatureInfo;
  } catch (error) {
    console.error("Ошибка получения данных о температуре процессора:", error);
  }
};

const getBatteryInfo = async () => {
  try {
    const battery = await si.battery();
    const batteryNeedInfo = {
      chargeLevel: 0,
    };
    batteryNeedInfo.chargeLevel = battery.percent;
    return batteryNeedInfo;
  } catch (error) {
    console.error("Ошибка получения данных о батарее:", error);
  }
};
