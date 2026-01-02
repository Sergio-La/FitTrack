import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';


interface Props {
    label?: string;
    iconLeft?: keyof typeof MaterialCommunityIcons.glyphMap;
    iconRight?: keyof typeof MaterialCommunityIcons.glyphMap;
    placeholder?: string;
    value: string;
    onChangeText: (value: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'url';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
};

export const CustomInput = ({ label, iconLeft, iconRight, ...props }: Props) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.container}>
                <MaterialCommunityIcons name={iconLeft} size={20} color={COLORS.textMedium} style={[styles.icon, { display: iconLeft ? 'flex' : 'none' }]} />
                <TextInput
                    style={styles.input}
                    placeholderTextColor={COLORS.textMedium}
                    {...props} // Pasa automáticamente placeholder, value, etc.
                />
                <MaterialCommunityIcons name={iconRight} size={20} color={COLORS.textMedium} style={[styles.icon, { display: iconRight ? 'flex' : 'none' }]} />
                {/* Nuestro propio ojo con el color correcto 🎨 */}
                <TouchableOpacity style={{ display: props.secureTextEntry ? 'flex' : 'none' }} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
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
        height: 55,
        color: COLORS.textMedium,
    },
    icon: { marginRight: 10 },
    input: { flex: 1, color: COLORS.textMedium, fontSize: 16 },
});