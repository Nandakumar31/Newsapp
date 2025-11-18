import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveCache = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log("Cache error:", e);
  }
};

export const loadCache = async (key) => {
  try {
    const json = await AsyncStorage.getItem(key);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    return [];
  }
};
