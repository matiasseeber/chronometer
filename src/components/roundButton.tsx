import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface RoundButtonProps {
    backgroundColor: string;
    textColor: string;
    text: string;
    diameter: number;
    disabled?: boolean;
    fontSize?: number;
    onPress?: () => void;
}

const RoundButton: React.FC<RoundButtonProps> = ({ disabled = false, backgroundColor, textColor, text, onPress, diameter, fontSize }) => {
    return (
        <Pressable
            style={[styles.button, { backgroundColor, height: diameter, width: diameter }]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={{ color: textColor, fontSize }}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default RoundButton;
