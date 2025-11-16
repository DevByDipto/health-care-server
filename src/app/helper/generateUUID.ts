export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0; // 0-15 random number
    const v = c === 'x' ? r : (r & 0x3 | 0x8); // 'y' position এর জন্য 8,9,a,b
    return v.toString(16); // hex string
  });
};