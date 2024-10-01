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

export function startOfWeek(date: Date, offset: number = 0) {
  const currDate = new Date(date); // Create a copy of the original date
  const dayOfWeek = currDate.getDay(); // Get the day of the week (0 = Sunday)
  
  // Calculate the difference to move the date to the previous Sunday
  const diff = dayOfWeek === 0 ? -6 : -dayOfWeek;

  // Adjust to the start of the week (Sunday) and apply any offset
  currDate.setDate(currDate.getDate() + diff + offset);

  return currDate;
}
