import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';


interface Props {
    label?: string;
    iconLeft?: keyof typeof MaterialCommunityIcons.glyphMap;
    iconRight?: keyof typeof MaterialCommunityIcons.glyphMap;
    placeholder?: string;
    value: string | number | null;
    onChangeText: (value: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'url';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    isRequired?: boolean;
    isMultiline?: boolean;
};

export const CustomInput = ({ label, iconLeft, iconRight, isMultiline, ...props }: Props) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const alturaDinamica: TextStyle = {
        height: isMultiline ? SIZES.inputMultilineHeight : SIZES.inputHeight,
        // Usamos el tipado explícito para evitar el error de Overload
        textAlignVertical: isMultiline ? 'top' : 'center',
        paddingTop: isMultiline ? 12 : 0,
    };
    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label} {props.isRequired ? <Text style={styles.required}>*</Text> : ''} {!props.isRequired ? <Text style={styles.optionalText}>(Opcional)</Text> : ''}</Text>}
            <View style={styles.container}>
                <MaterialCommunityIcons name={iconLeft} size={20} color={COLORS.textMedium} style={[styles.icon, { display: iconLeft ? 'flex' : 'none' }]} />
                <TextInput
                    {...props}
                    placeholderTextColor={COLORS.textMedium}
                    secureTextEntry={props.secureTextEntry && !isPasswordVisible}
                    numberOfLines={isMultiline ? 4 : 1}
                    style={[styles.input, alturaDinamica]}
                    multiline={isMultiline}
                    value={props.value?.toString() || ''}
                />
                <MaterialCommunityIcons name={iconRight} size={20} color={COLORS.textMedium} style={[styles.icon, { display: iconRight ? 'flex' : 'none' }]} />
                {/* Nuestro propio ojo con el color correcto 🎨 */}
                <TouchableOpacity style={{ display: props.secureTextEntry && !iconRight ? 'flex' : 'none' }} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <MaterialCommunityIcons
                        name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color={COLORS.textMedium} // Ahora sí es blanco/homogéneo
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: { marginBottom: 15 },
    label: { color: COLORS.textMedium, marginBottom: 5, fontWeight: 'bold' },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radius,
        paddingHorizontal: 15,
        //height: SIZES.inputHeight,
        color: COLORS.textMedium,
    },
    icon: { marginRight: 10 },
    input: { flex: 1, color: COLORS.textMedium, fontSize: 16 },
    required: { color: COLORS.danger },
    optionalText: { color: COLORS.textMedium, fontSize: 12, fontWeight: 'normal' },
});