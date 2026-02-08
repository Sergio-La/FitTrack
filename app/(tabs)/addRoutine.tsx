import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomHeader } from "../../components/CustomHeader";
import { CustomInput } from "../../components/CustomInput";
import { COLORS, SIZES } from "../../constants/theme";

const AddRoutine = () => {
    const router = useRouter();
    const [nombreRutina, setNombreRutina] = useState('');

    const handleBackButton = () => {
        router.back();
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <CustomHeader title="Agregar Rutina" showBackButton={true} onPress={handleBackButton} />
                <CustomInput
                    label="Nombre de la rutina"
                    placeholder="Ej. Rutina de fuerza"
                    value={nombreRutina}
                    onChangeText={setNombreRutina}
                    iconRight="format-title"
                    isRequired
                />

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: SIZES.base * 3,
    },
});

export default AddRoutine;