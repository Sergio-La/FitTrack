import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { COLORS, SIZES } from '../constants/theme';

interface Props {
    items: { label: string; value: string | number }[];
    value: string | number | null;
    setValue: React.Dispatch<React.SetStateAction<any>>; // Para manejar el estado desde el padre
    placeholder?: string;
    label?: string;
    error?: string; // Nueva: para validaciones
    zIndex?: number; // Nueva: CRÍTICA para que no se tape con otros inputs
    isRequired?: boolean;
}

export const CustomDropdown = ({
    items,
    value,
    setValue,
    placeholder,
    label,
    error,
    zIndex = 1000,
    isRequired
}: Props) => {
    const [open, setOpen] = useState(false);
    const [listItems, setListItems] = useState(items);

    return (
        <View style={[styles.wrapper, { zIndex }]}>
            {label && <Text style={styles.label}>{label} {isRequired ? <Text style={styles.required}>*</Text> : ''}</Text>}

            <DropDownPicker
                open={open}
                value={value}
                items={listItems}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setListItems}

                // Configuración y Estilo
                placeholder={placeholder || "Seleccionar..."}
                theme="DARK"
                listMode="SCROLLVIEW" // Mejor para formularios largos
                searchable={true}
                searchPlaceholder="Buscar..."

                // Estilos personalizados para tu diseño Industrial 🏗️
                style={[
                    styles.dropdown,
                    error ? { borderColor: COLORS.danger } : { borderColor: COLORS.border }
                ]}
                dropDownContainerStyle={styles.dropDownContainer}
                textStyle={styles.text}
                placeholderStyle={styles.placeholder}
                ArrowDownIconComponent={() => (
                    <MaterialCommunityIcons name="magnify" size={SIZES.font} color={COLORS.textMedium} />
                )}
                ArrowUpIconComponent={() => (
                    <MaterialCommunityIcons name="chevron-up" size={SIZES.font} color={COLORS.textMedium} />
                )}
                TickIconComponent={() => (
                    <MaterialCommunityIcons name="check" size={SIZES.font} color={COLORS.primary} />
                )}


            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        color: COLORS.textMedium,
        marginBottom: 8,
        fontWeight: 'bold',
        fontSize: 14,
    },
    dropdown: {
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radius,
        height: SIZES.inputHeight,
        borderWidth: 1,
    },
    dropDownContainer: {
        backgroundColor: COLORS.surface,
        borderColor: COLORS.border,
        borderRadius: SIZES.radius,
    },
    text: {
        color: COLORS.textHigh,
        fontSize: 16,
    },
    placeholder: {
        color: COLORS.textMedium,
    },
    arrowIcon: {
        tintColor: COLORS.textMedium,
    },
    tickIcon: {
        tintColor: COLORS.primary,
    },
    errorText: {
        color: COLORS.danger,
        fontSize: 12,
        marginTop: 5,
    },
    required: {
        color: COLORS.danger,
        fontSize: 12,
    },
});