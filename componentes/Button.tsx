import react from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { branding, borderRadius, colors, typography, spacing } from '../theme';


interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
    isLoading?: boolean;
    style?: ViewStyle;
}

export const Button = (
    {
        title,
        onPress,
        variant = 'primary',
        isLoading,
        style
    }: ButtonProps
) => {
    const handlePress = () => {
        //Vibración corta antes de ejecutar la acción
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
    };

    return (
        <Pressable
            onPress={handlePress}
            disabled={isLoading}
            style={({ pressed }) => [
                styles.container,
                variant === 'primary' ? styles.primaryContainer : styles.secondaryContainer,
                pressed && styles.pressed,
                style
            ]}
        >
            {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
            ) : (
                <Text style={[
                    styles.text,
                    variant === 'primary' ? styles.primaryText : styles.secondaryText
                ]}>
                    {title}
                </Text>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 48, // Tu regla de Touch Target
        borderRadius: borderRadius.button, // Los 12 que definimos
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: spacing.paddingGlobal,
    },
    primaryContainer: {
        backgroundColor: branding.primary, // El Vivid Orange #FF5733
    },
    secondaryContainer: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: branding.primary,
    },
    pressed: {
        opacity: 0.8, // Se desvanece un poco al tocarlo
        transform: [{ scale: 0.98 }], // Se hace un pelín más pequeño (efecto 3D)
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        // Aquí luego pondremos fontFamily: 'Inter'
    },
    primaryText: {
        color: '#FFFFFF', // Texto blanco sobre fondo naranja
    },
    secondaryText: {
        color: branding.primary, // Texto naranja sobre fondo transparente
    },
}); 