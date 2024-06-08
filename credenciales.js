// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2VftK56kGiY3_3_XDs_hBikxj8ykr0zI",
  authDomain: "chronometer-a972b.firebaseapp.com",
  projectId: "chronometer-a972b",
  storageBucket: "chronometer-a972b.appspot.com",
  messagingSenderId: "782475246291",
  appId: "1:782475246291:web:16cffea52c955830a2b226",
  measurementId: "G-HJPVY43CN6",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export const auth = initializeAuth(appFirebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
//export const auth = getAuth(appFirebase);
export default appFirebase;
