import { StyleSheet, View } from "react-native";
import colors from "../resources/colors";
import { useEffect, useState } from "react";
import TimeText from "../components/timeText";
import LapsContainer from "../components/lapsContainer";
import TwoButtons from "../components/twoButtons";
import { getCurrentPositionAsync, LocationObject } from "expo-location";
import { addDataToFirestore } from "../helpers/fireStore";

const btnFontSize = 17;
const btnFontDiameter = 90;

let startBtnInfo = {
  backgroundColor: colors.darkGreen,
  textColor: colors.lightGreen,
  text: "Iniciar",
};

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
  addDataToFirestore(data);
}

let initTimestamp: number;

const getCurrentPosition = async () => await getCurrentPositionAsync({});

export default function Chronometer() {
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [initLocation, setInitLocation] = useState({} as LocationObject);
  const [laps, setLaps] = useState([] as number[]);

  const isPaused = !isRunning && !!timer;

  let promise: Promise<unknown>;

  const onClickInitBtn = async () => {
    const newValue: boolean = !isRunning;
    if (newValue) {
      startBtnInfo.backgroundColor = colors.darkRed;
      startBtnInfo.textColor = colors.lightRed;
      startBtnInfo.text = "Detener";
      if (timer == 0) {
        initTimestamp = new Date().getTime();
        promise = new Promise(async () => {
          const location = await getCurrentPosition();
          setInitLocation(location);
        });
      }
    } else {
      startBtnInfo.backgroundColor = colors.darkGreen;
      startBtnInfo.textColor = colors.lightGreen;
      startBtnInfo.text = "Iniciar";
    }
    setIsRunning(newValue);
  };

  const onClickLapBtn = () => {
    if (isPaused) {
      setIsRunning(false);
      setTimer(0);
      setLaps([]);
    } else {
      const current_timestamp = new Date().getTime();
      const lapTime = current_timestamp - initTimestamp;
      setLaps((previousLaps) => [...previousLaps, lapTime]);
      initTimestamp = current_timestamp;
      new Promise(async () => {
        await promise;
        let location = await getCurrentPosition();
        SaveLap(lapTime, initLocation!, location);
        setInitLocation(location);
      });
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval!);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <View style={styles.container}>
      <TimeText time={timer} />
      <TwoButtons
        leftBtnDisabled={timer == 0}
        leftBtnBckColor={colors.darkGray}
        leftBtnTextColor={colors.lightGray}
        leftBtnText={isPaused ? "Reiniciar" : "Vuelta"}
        leftBtnDiameter={btnFontDiameter}
        leftBtnFontSize={btnFontSize}
        leftBtnOnClick={onClickLapBtn}
        rightBtnDisabled={false}
        rightBtnBckColor={startBtnInfo.backgroundColor}
        rightBtnTextColor={startBtnInfo.textColor}
        rightBtnText={startBtnInfo.text}
        rightBtnDiameter={btnFontDiameter}
        rightBtnFontSize={btnFontSize}
        rightBtnOnClick={onClickInitBtn}
      />
      <View style={styles.horizontalLine} />
      <LapsContainer laps={laps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 100,
    paddingBottom: 30,
  },
  btnContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  horizontalLine: {
    height: 1,
    width: "85%",
    backgroundColor: colors.grayAlmostBlack,
    marginTop: 30,
  },
});
