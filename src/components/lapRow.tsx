import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { formatTimestamp } from '../helpers/formatTime';
import colors from '../resources/colors';

interface LapRowProps {
    lap: number;
    index: number;
};

const LapRow: React.FC<LapRowProps> = ({ lap, index }) => {
    return (
        <View style={styles.lapContainer}>
            <Text style={styles.textLaps}>
                {`Vuelta ${index + 1}`}
            </Text>
            <Text style={styles.textLaps}>
                {formatTimestamp(lap)}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default LapRow;