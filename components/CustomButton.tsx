import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';


interface Props {
    activeOpacity?: number;
    label?: string;
    iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
    onPress: () => void;
};

export const CustomBottom = ({ activeOpacity, label, iconName, onPress }: Props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={activeOpacity}>
            {label && <Text style={styles.buttonText}>{label}</Text>}
            {iconName && <MaterialCommunityIcons name={iconName} size={SIZES.buttonIcon} color={COLORS.textHigh} />}
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        height: SIZES.buttonHeight,
        borderRadius: SIZES.buttonRadius,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.base,
        flexDirection: 'row',
        gap: SIZES.base,
    },
    buttonText: {
        color: COLORS.textHigh,
        fontWeight: 'bold',
        fontSize: SIZES.font,
        textTransform: 'uppercase',
    },
});