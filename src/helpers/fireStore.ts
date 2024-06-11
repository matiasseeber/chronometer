import { doc, serverTimestamp, getDoc, addDoc, collection, query, getDocs } from "firebase/firestore";
import { db, auth } from '../../credenciales';  // Adjust the path as needed

export async function addDataToFirestore(data: any, colectionName: string = "laps") {
    const user = auth.currentUser;
    if (user) {
        try {
            console.log(data)
            const response = await addDoc(collection(db, colectionName, user.uid, "userLaps"), JSON.parse(data));
            console.log('Data added successfully');
            console.log(response);
        } catch (error) {
            console.error('Error adding data: ', error);
        }
    } else {
        console.log('No user is signed in');
    }
}

export async function getDataFromFirestore(collectionName: string = "laps") {
    const user = auth.currentUser;
    if (user) {
        try {
            const userId = user.uid;
            const userLapsCollection = collection(db, collectionName, userId, "userLaps");
            const lapsQuery = query(userLapsCollection);
            const querySnapshot = await getDocs(lapsQuery);

            if (!querySnapshot.empty) {
                const laps = querySnapshot.docs.map(doc => doc.data());
                console.log('User laps:', laps);
                return laps;
            } else {
                console.log('No laps found for user!');
                return [];
            }
        } catch (error) {
            console.error('Error getting user laps: ', error);
            return [];
        }
    } else {
        console.log('No user is signed in');
        return [];
    }
}