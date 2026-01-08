import { CustomBottom } from "@/components/CustomButton";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomHeader } from "../../components/CustomHeader";
import { CustomInput } from "../../components/CustomInput";
import { COLORS, SIZES } from "../../constants/theme";
import { registrarAboutYou } from "../../database/db-service";

const AboutYou = () => {
    const router = useRouter();

    const handleBackButton = () => {
        router.back();
    };

    const [estatura, setEstatura] = useState('0');
    const [peso, setPeso] = useState('0');
    const [edad, setEdad] = useState('0');
    // Primero definimos un tipo para los géneros válidos
    type Gender = 'masculino' | 'femenino' | 'otro';

    // Luego inicializamos el estado
    const [genero, setGenero] = useState<Gender | null>(null);

    const handleSaveAboutYou = () => {
        if (!estatura || !peso || !edad || !genero) {
            alert("Valida los campos requeridos.");
            return;
        } else if (!handleInput(estatura)) {
            alert("La estatura debe ser un número entre 1 y 300.");
            return;
        } else if (!handleInput(peso)) {
            alert("El peso debe ser un número entre 1 y 300.");
            return;
        } else if (!handleInput(edad)) {
            alert("La edad debe ser un número entre 1 y 300.");
            return;
        }

        const aboutYou = {
            estatura: Number(estatura),
            peso: Number(peso),
            edad: Number(edad),
            genero: genero,
            usuario_id: 1,
        };
        registrarAboutYou(aboutYou);
    };

    const handleInput = (value: string) => {
        const regex = /^(?:[1-9]|[1-9][0-9]|1[0-9]{2}|2[0-9]{2}|300)$/;

        //Validar si cumple con el regex
        if (regex.test(value)) {
            return true;
        }
        return false;
    };

    const genderOptions: { id: Gender; label: string; icon: any }[] = [
        { id: 'masculino', label: 'Masculino', icon: 'gender-male' },
        { id: 'femenino', label: 'Femenino', icon: 'gender-female' },
        { id: 'otro', label: 'Otro', icon: 'gender-non-binary' },
    ];

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <CustomHeader title="About You" showBackButton onPress={handleBackButton} />
                <View style={styles.formContainer}>
                    <CustomInput
                        placeholder="Estatura (cm)"
                        label="Estatura (cm)"
                        value={estatura}
                        onChangeText={setEstatura}
                        keyboardType="numeric"
                        iconRight="ruler"
                        isRequired
                    />
                    <CustomInput
                        placeholder="Peso (kg)"
                        label="Peso (kg)"
                        value={peso}
                        onChangeText={setPeso}
                        keyboardType="numeric"
                        iconRight="scale-bathroom"
                        isRequired
                    />
                    <CustomInput
                        placeholder="Edad"
                        label="Edad"
                        value={edad}
                        onChangeText={setEdad}
                        keyboardType="numeric"
                        iconRight="calendar-blank"
                        isRequired
                    />

                    <View style={styles.genderContainer}>
                        <Text style={styles.genderLabel}>Género<Text style={styles.required}>*</Text></Text>
                        <View style={styles.genderOptionsContainer}>
                            {genderOptions.map((option) => (
                                <TouchableOpacity
                                    key={option.id}
                                    onPress={() => setGenero(option.id)}
                                    style={[
                                        styles.genderOption,
                                        genero === option.id && styles.selectedGenderOption,
                                    ]}
                                >
                                    <MaterialCommunityIcons name={option.icon as any} size={24} color={COLORS.textHigh} />
                                    <Text style={styles.genderText}>{option.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                </View>
                <CustomBottom
                    label="Guardar"
                    iconName="content-save-outline"
                    onPress={handleSaveAboutYou}
                />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        flex: 1,
        padding: SIZES.padding,
    },
    formContainer: {
        flex: 1,
        gap: SIZES.padding,
    },
    genderOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.padding,
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
    },
    selectedGenderOption: {
        backgroundColor: COLORS.primary,
    },
    genderText: {
        color: COLORS.textHigh,
    },
    genderContainer: {
        flexDirection: 'column',
        gap: SIZES.padding,
    },
    genderLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textMedium,

    },
    genderOptionsContainer: {
        flexDirection: 'row',
        gap: SIZES.padding,
    },
    required: {
        color: COLORS.danger,
    },
});


export default AboutYou;