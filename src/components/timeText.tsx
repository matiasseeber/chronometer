import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { formatTime } from '../helpers/formatTime';

interface TimeTextProps {
    time: number;
    fontSize?: number;
}

const TimeText: React.FC<TimeTextProps> = ({ time, fontSize = 90 }) => {
    return (
        <Text style={{...styles.text, fontSize }}>
            {formatTime(time)}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontWeight: '200',
        width: "100%",
        textAlign: "center"
    }
});

export default TimeText;
