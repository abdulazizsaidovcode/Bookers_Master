import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import {IButton} from "@/type/button/button";

const Buttons: React.FC<IButton> = ({ title, backgroundColor = '#9C0A35', textColor = 'white', onPress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: backgroundColor }
            ]}
            onPress={onPress}
            activeOpacity={.8}
        >
            <Text style={[styles.buttonText, { color: textColor }]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 15,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
    },
});

export default Buttons;
