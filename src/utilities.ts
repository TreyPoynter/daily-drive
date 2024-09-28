import AsyncStorage from "@react-native-async-storage/async-storage";

export const setLocalItem = async (key: string, valueToBeSaved: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(valueToBeSaved));
}

export const getLocalItem = async (key: string) => {
  const result = await AsyncStorage.getItem(key);
  if(result)
    return JSON.parse(result);
  return null;
}

export const deleteLocalItem = async (key: string) => {
  await AsyncStorage.removeItem(key);
}
