import AsyncStorage from "@react-native-async-storage/async-storage";

export const SaveLap = async (lapTime: number) => (await AsyncStorage.setItem(new Date().toISOString(), lapTime.toString()))