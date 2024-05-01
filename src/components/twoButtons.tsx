import React from 'react';
import { View, StyleSheet } from 'react-native';
import RoundButton from './roundButton';

interface TwoButtonsProps {
    leftBtnOnClick: () => void;
    rightBtnOnClick: () => void;
    leftBtnDisabled: boolean;
    rightBtnDisabled: boolean;
    leftBtnBckColor: string;
    rightBtnBckColor: string;
    leftBtnTextColor: string;
    rightBtnTextColor: string;
    leftBtnText: string;
    rightBtnText: string;
    leftBtnFontSize: number;
    rightBtnFontSize: number;
    leftBtnDiameter: number;
    rightBtnDiameter: number;
};

const TwoButtons: React.FC<TwoButtonsProps> = (props) => {
    return (
        <View style={{ ...styles.btnContainer }}>
            <RoundButton disabled={props.leftBtnDisabled} backgroundColor={props.leftBtnBckColor} textColor={props.leftBtnTextColor} text={props.leftBtnText} diameter={props.leftBtnDiameter} fontSize={props.leftBtnFontSize} onPress={props.leftBtnOnClick} />
            <RoundButton disabled={props.rightBtnDisabled} backgroundColor={props.rightBtnBckColor} textColor={props.rightBtnTextColor} text={props.rightBtnText} diameter={props.rightBtnDiameter} fontSize={props.rightBtnFontSize} onPress={props.rightBtnOnClick} />
        </View>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%"
    }
});

export default TwoButtons;