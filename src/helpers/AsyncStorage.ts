import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationObject } from 'expo-location';

export const SaveLap = async (lapTime: number, init_point: LocationObject, end_point: LocationObject) => {
    const data = JSON.stringify({
        lapTime: lapTime.toString(),
        init_point: {
            lat: init_point.coords.latitude,
            lon: init_point.coords.longitude,
            accuracy: init_point.coords.accuracy,
            timestamp: init_point.timestamp
        },
        end_point: {
            lat: end_point.coords.latitude,
            lon: end_point.coords.longitude,
            accuracy: end_point.coords.accuracy,
            timestamp: end_point.timestamp
        }
    });
    console.log(data)
    await AsyncStorage.setItem(new Date().toISOString(), data)
}