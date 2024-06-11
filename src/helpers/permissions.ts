import { requestForegroundPermissionsAsync } from "expo-location";

export async function requestLocationPermission() {
    let { status } = await requestForegroundPermissionsAsync();
}

