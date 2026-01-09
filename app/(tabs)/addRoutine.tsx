import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomHeader } from "../../components/CustomHeader";
import { COLORS, SIZES } from "../../constants/theme";

const AddRoutine = () => {
    const router = useRouter();
    const [nombreRutina, setNombreRutina] = useState('');
    // @ts-ignore
    const [dias, setDias] = useState([]);
    // @ts-ignore
    const [gruposMusculares, setGruposMusculares] = useState([]);
    // @ts-ignore
    const [ejercicios, setEjercicios] = useState([]);

    const handleBackButton = () => {
        router.back();
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <CustomHeader title="Agregar Rutina" showBackButton={true} onPress={handleBackButton} />
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