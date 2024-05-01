import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { formatTime } from '../helpers/formatTime';

interface TimeTextProps {
    time: number;
}

const TimeText: React.FC<TimeTextProps> = ({ time }) => {
    return (
        <Text style={styles.text}>
            {formatTime(time)}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 90,
        fontWeight: '200',
        width: "100%",
        textAlign: "center"
    }
});

export default TimeText;
