export const formatSize = (bytes: number) => {
  const units = ["B", "KB", "MB", "GB", "PB"];

  let currentValue = bytes;
  let i: number;
  for (i = 0; currentValue / 1024 >= 1; i++) {
    currentValue = currentValue / 1024;
  }
  return `${currentValue.toFixed(2)} ${units[i]}`;
};
