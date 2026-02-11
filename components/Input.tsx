import react from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors, spacing, borderRadius, typography, branding } from '../theme';

interface InputProps extends TextInputProps {
    label: string;
    error?: string;
}

export const Input = ({ label, error, ...props }: InputProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                placeholderTextColor={colors.dark.textMed} // Usamos el color de énfasis medio
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.gutter,
        width: '100%',
    },
    label: {
        color: colors.dark.textHigh,
        fontSize: 14,
        marginBottom: 4,
        fontWeight: '600',
    },
    input: {
        height: 48, // Touch Target
        backgroundColor: colors.dark.surface2, // #3A3A3C
        borderRadius: borderRadius.inner, // 12px
        paddingHorizontal: spacing.paddingGlobal,
        color: colors.dark.textHigh,
        fontSize: 16,
    },
    inputError: {
        borderWidth: 1,
        borderColor: branding.danger, // Rojo para errores
    },
    errorText: {
        color: branding.danger,
        fontSize: 12,
        marginTop: 4,
    },
});