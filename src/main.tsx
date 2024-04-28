import { StyleSheet, Text, View, ScrollView } from 'react-native';
import RoundButton from './components/roundButton';
import colors from './resources/colors';
import { useEffect, useState } from 'react';

const btnFontSize = 17;
const btnFontDiameter = 90;

let startBtnInfo = {
    backgroundColor: colors.darkGreen,
    textColor: colors.lightGreen,
    text: "Iniciar"
};

let initTimestamp: number;

export default function Main() {
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

    const formatTime = (timeInSeconds: number) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const formatTimestamp = (lapTime: number): string => {
        const hours = Math.floor(lapTime / (1000 * 60 * 60));
        const minutes = Math.floor((lapTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((lapTime % (1000 * 60)) / 1000);
        const ms = lapTime % 1000;
        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${ms < 10 ? '00' : ms < 100 ? '0' : ''}${ms}`;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{formatTime(timer)}</Text>
            <View style={styles.btnContainer}>
                <RoundButton disabled={timer == 0} backgroundColor={colors.darkGray} textColor={colors.lightGray} text={isPaused ? "Reiniciar" : "Vuelta"} diameter={btnFontDiameter} fontSize={btnFontSize} onPress={onClickLapBtn} />
                <RoundButton backgroundColor={startBtnInfo.backgroundColor} textColor={startBtnInfo.textColor} text={startBtnInfo.text} diameter={btnFontDiameter} fontSize={btnFontSize} onPress={onClickInitBtn} />
            </View>
            <View style={styles.horizontalLine} />
            <ScrollView>
                {
                    laps.map((item, index) => {
                        return <View style={styles.lapContainer} key={index}>
                            <Text style={styles.textLaps}>
                                {`Vuelta ${index + 1}`}
                            </Text>
                            <Text style={styles.textLaps}>
                                {formatTimestamp(item)}
                            </Text>
                        </View>
                    })
                }
            </ScrollView>
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
    text: {
        color: "white",
        fontSize: 90,
        fontWeight: '200',
        width: "100%",
        textAlign: "left",
        paddingLeft: "6%"
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
    },
    lapContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        alignItems: "center",
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: colors.grayAlmostBlack
    },
    textLaps: {
        fontSize: 15,
        color: colors.lightGray
    }
});
