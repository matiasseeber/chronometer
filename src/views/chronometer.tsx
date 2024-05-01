import { StyleSheet, View } from 'react-native';
import colors from '../resources/colors';
import { useEffect, useState } from 'react';
import TimeText from '../components/timeText';
import LapsContainer from '../components/lapsContainer';
import TwoButtons from '../components/twoButtons';

const btnFontSize = 17;
const btnFontDiameter = 90;

let startBtnInfo = {
    backgroundColor: colors.darkGreen,
    textColor: colors.lightGreen,
    text: "Iniciar"
};

let initTimestamp: number;

export default function Chronometer() {
    const [isRunning, setIsRunning] = useState(false);
    const [timer, setTimer] = useState(0);
    const [laps, setLaps] = useState([] as number[]);

    const isPaused = !isRunning && !!timer;

    const onClickInitBtn = () => {
        const newValue: boolean = !isRunning;
        if (newValue) {
            startBtnInfo.backgroundColor = colors.darkRed;
            startBtnInfo.textColor = colors.lightRed;
            startBtnInfo.text = "Detener";
            if (timer == 0) initTimestamp = new Date().getTime();
        } else {
            startBtnInfo.backgroundColor = colors.darkGreen;
            startBtnInfo.textColor = colors.lightGreen;
            startBtnInfo.text = "Iniciar";
        }
        setIsRunning(newValue);
    }

    const onClickLapBtn = () => {
        if (isPaused) {
            setIsRunning(false);
            setTimer(0);
            setLaps([]);
        } else {
            const current_timestamp = new Date().getTime();
            setLaps(previousLaps => [...previousLaps, current_timestamp - initTimestamp]);
            initTimestamp = current_timestamp;
        }
    }

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
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
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 100,
        paddingBottom: 30
    },
    btnContainer: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    },
    horizontalLine: {
        height: 1,
        width: "85%",
        backgroundColor: colors.grayAlmostBlack,
        marginTop: 30
    }
});
