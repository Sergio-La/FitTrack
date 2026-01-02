// src/components/FloatingButton.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

interface Props {
    onPress: () => void;
    title: string;
    iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
}

export const FloatingButton = ({ onPress, title, iconName }: Props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
            <MaterialCommunityIcons name={iconName} size={SIZES.fabIcon} color={COLORS.textHigh} style={styles.icon} />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        // 1. Posicionamiento mágico ✨
        position: 'absolute',
        bottom: SIZES.base, // Ajusta según la altura de tu barra de navegación (tabs)
        right: 20,

        // 2. Estilo visual (según tu imagen) 🎨
        backgroundColor: '#FF5733', // El naranja de tu diseño
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,

        // 3. Sombra para que se vea "encima" 👤
        elevation: 5, // Android
        shadowColor: '#000', // iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    text: {
        color: COLORS.textHigh,
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: SIZES.font,
    },
    icon: { marginRight: 10 },
});