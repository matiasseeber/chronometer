import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
// import CountDown from '../components/countdown';
import TimeText from '../components/timeText';
import TwoButtons from '../components/twoButtons';
import colors from '../resources/colors';

interface TimerProps {
    TrailWidth?: number;
    onComplete?: () => void;
}

const btnFontSize = 17;
const btnFontDiameter = 100;

let startBtnInfo = {
    backgroundColor: colors.darkGreen,
    textColor: colors.lightGreen,
    text: "Iniciar"
};

const Timer: React.FC<TimerProps> = ({ TrailWidth = 8, onComplete }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [timer, setTimer] = useState(60);
    const [key, setKey] = useState(0);

    const onClickInitBtn = () => {
        const newValue: boolean = !isRunning;
        if (newValue) {
            startBtnInfo.backgroundColor = colors.darkRed;
            startBtnInfo.textColor = colors.lightRed;
            startBtnInfo.text = "Detener";
        } else {
            startBtnInfo.backgroundColor = colors.darkGreen;
            startBtnInfo.textColor = colors.lightGreen;
            startBtnInfo.text = "Iniciar";
        }
        setIsRunning(newValue);
    }

    const onClickLeftBtn = () => {
        setIsRunning(false);
        setKey(prevKey => prevKey + 1);
        startBtnInfo.backgroundColor = colors.darkGreen;
        startBtnInfo.textColor = colors.lightGreen;
        startBtnInfo.text = "Iniciar";
    }

    return (
        <View style={styles.container}>
            <CountdownCircleTimer
                isPlaying={isRunning}
                duration={timer}
                initialRemainingTime={timer}
                colors="#f78801"
                trailStrokeWidth={TrailWidth}
                strokeWidth={TrailWidth}
                onUpdate={(time) => console.log(time)}
                size={300}
                onComplete={onComplete}
                key={key}
            >
                {
                    ({ remainingTime }) => <TimeText time={remainingTime} fontSize={60} />
                }
            </CountdownCircleTimer>
            <View style={styles.TwoButtonsContainer}>
                <TwoButtons
                    leftBtnDisabled={timer == 0}
                    leftBtnBckColor={colors.darkGray}
                    leftBtnTextColor={colors.lightGray}
                    leftBtnText={"Cancelar"}
                    leftBtnDiameter={btnFontDiameter}
                    leftBtnFontSize={btnFontSize}
                    leftBtnOnClick={onClickLeftBtn}
                    rightBtnDisabled={false}
                    rightBtnBckColor={startBtnInfo.backgroundColor}
                    rightBtnTextColor={startBtnInfo.textColor}
                    rightBtnText={startBtnInfo.text}
                    rightBtnDiameter={btnFontDiameter}
                    rightBtnFontSize={btnFontSize}
                    rightBtnOnClick={onClickInitBtn}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        padding: "10%",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%"
    },
    TwoButtonsContainer: {
        paddingTop: "5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    }
});

export default Timer;