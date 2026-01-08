import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

interface Props {
    label?: string;
    value: number;
    onIncrement: (value: number) => void;
    onDecrement: (value: number) => void;
    minValue?: number;
    maxValue?: number;
    step?: number;
    isRequired?: boolean;
};

export const CustomCounter = ({ label, value, onIncrement, onDecrement, minValue, maxValue, step, isRequired }: Props) => {

    const increment = () => {
        if (value < (maxValue || 100)) {
            onIncrement(value + (step || 1));
        }
    };

    const decrement = () => {
        if (value > (minValue || 0)) {
            onDecrement(value - (step || 1));
        }
    };

    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label} {isRequired ? <Text style={styles.required}>*</Text> : ''}</Text>}
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={decrement}>
                    <MaterialIcons name="remove" size={24} color={COLORS.textMedium} />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    value={value.toString()}
                    onChangeText={(value) => {
                        const newValue = parseInt(value);
                        if (!isNaN(newValue)) {
                            onIncrement(newValue);
                        }
                    }}
                    keyboardType="numeric"
                    textAlign="center"
                />
                <TouchableOpacity style={styles.button} onPress={increment}>
                    <MaterialIcons name="add" size={24} color={COLORS.textMedium} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: { marginBottom: 15, width: '100%' },
    label: { color: COLORS.textMedium, marginBottom: 5, fontWeight: 'bold' },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radius,
        paddingHorizontal: 15,
        height: SIZES.inputHeight,
        color: COLORS.textMedium,
    },
    button: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: { flex: 1, color: COLORS.textMedium, fontSize: 16, textAlign: 'center' },
    required: { color: COLORS.danger },
});
