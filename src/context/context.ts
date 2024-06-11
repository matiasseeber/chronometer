import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { Lap } from "../views/historyList";
import { getDataFromFirestore } from "../helpers/fireStore";

interface LapContext {
    laps: Lap[];
    setLaps: Dispatch<SetStateAction<Lap[]>>;
}

export const LapContext = createContext<LapContext>({
    laps: [],
    setLaps: () => { },
});

export const fetchLaps = async (): Promise<Lap[]> => {
    const laps: Lap[] = (await getDataFromFirestore()) as Lap[];
    return laps;
}