import { TimerPicker } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient"; // or `import LinearGradient from "react-native-linear-gradient"`
import { Audio } from "expo-av"; // for audio feedback (click sound as you scroll)
import * as Haptics from "expo-haptics"; // for haptic feedback
import React, { useState } from 'react';
import { View } from "react-native";;

export interface DurationParams {
    hours: number;
    minutes: number;
    seconds: number;
}

interface TimepickerProps {
    onDurationChange: (duration: DurationParams) => void;
    initialValue: DurationParams;
}

export const Timepicker: React.FC<TimepickerProps> = ({
    onDurationChange, initialValue
}) => {

    return (
        <View style={{ backgroundColor: "transparent", alignItems: "center", justifyContent: "center" }}>
            <TimerPicker
                initialValue={initialValue}
                padWithNItems={2}
                hourLabel=":"
                minuteLabel=":"
                secondLabel=""
                // Audio={Audio}
                LinearGradient={LinearGradient}
                // Haptics={Haptics}
                onDurationChange={(duration) => {
                    onDurationChange(duration);
                }}
                styles={{
                    theme: "dark",
                    backgroundColor: "transparent",
                    pickerItem: {
                        fontSize: 34,
                    },
                    pickerLabel: {
                        fontSize: 32,
                        marginTop: 0,
                    },
                    pickerContainer: {
                        marginRight: 6,
                    },
                    pickerItemContainer: {
                        width: 100
                    },
                    pickerLabelContainer: {
                        right: -20,
                        top: 0,
                        bottom: 6,
                        width: 40,
                        alignItems: "center",
                    },
                }}
            />
        </View>
    )

}