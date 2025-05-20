declare global {
  interface Window {
    electron: {
      closeApp: () => void;
      getCompInfo: (email: string) => void;
    };
  }
}

export {};
