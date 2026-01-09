import { CustomBottom } from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomDropdown } from "../../components/CustomDropdown";
import { CustomHeader } from "../../components/CustomHeader";
import { CustomInput } from "../../components/CustomInput";
import { COLORS, SIZES } from "../../constants/theme";
import { consultarGruposMusculares, registrarEjercicio } from "../../database/db-service";

const AddWorkout = () => {

    const router = useRouter();

    const [grupoMuscular, setGrupoMuscular] = useState<number | null>(null);
    const [nombreEjercicio, setNombreEjercicio] = useState('');
    const [repeticiones, setRepeticiones] = useState(0);
    const [series, setSeries] = useState(0);
    const [peso, setPeso] = useState('0');
    const [descripcion, setDescripcion] = useState('');
    const [notas, setNotas] = useState('');

    const handleBackButton = () => {
        router.back();
    };

    const gruposMusculares = consultarGruposMusculares();

    const prepararGruposMusculares = (datos: any[]) => {
        return datos.map((grupo) => {
            return {
                label: grupo.nombre_grupo,
                value: grupo.grupo_muscular_id,
            };
        });
    };

    const gruposMuscularesDropdown = prepararGruposMusculares(gruposMusculares);

    {/*const handleWeightChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setPeso(numericValue);
    };*/}

    const handleSaveWorkout = () => {
        if (!grupoMuscular || !nombreEjercicio || !repeticiones || !series || !peso) {
            alert("Valida los campos requeridos.");
            return;
        }

        registrarEjercicio({
            nombre_ejercicio: nombreEjercicio,
            descripcion_ejercicio: descripcion,
            notas: notas,
            usuario_id: 1, // TODO: usar usuario real
            grupo_muscular_id: grupoMuscular,
            // @ts-ignore: Propiedades pendientes de agregar a la DB
            repeticiones: repeticiones,
            // @ts-ignore
            series: series,
            // @ts-ignore
            peso: peso,
        });
    };
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <CustomHeader title="Add Workout" showBackButton onPress={handleBackButton} />
                <View style={styles.formContainer}>
                    <CustomInput
                        placeholder="Nombre del ejercicio"
                        label="Nombre del ejercicio"
                        isRequired={true}
                        value={nombreEjercicio}
                        onChangeText={setNombreEjercicio}
                    />
                    <CustomDropdown
                        items={gruposMuscularesDropdown}
                        value={grupoMuscular}
                        setValue={setGrupoMuscular}
                        placeholder="Selecciona un grupo muscular"
                        label="Grupo muscular"
                        isRequired={true}
                        zIndex={1000}
                    />
                    {/* insertar una linea horizontal */}
                    <View
                        style={{
                            borderBottomColor: COLORS.border,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            marginVertical: 10,
                        }}
                    />
                </View>
                {/*
                <View style={styles.wrapper}>
                    <View style={styles.counterContainer}>
                        <CustomCounter
                            label="Series"
                            value={series}
                            onIncrement={setSeries}
                            onDecrement={setSeries}
                            minValue={0}
                            maxValue={100}
                            step={1}
                            isRequired={true}
                        />
                    </View>
                    <View style={styles.counterContainer}>
                        <CustomCounter
                            label="Repeticiones"
                            value={repeticiones}
                            onIncrement={setRepeticiones}
                            onDecrement={setRepeticiones}
                            minValue={0}
                            maxValue={100}
                            step={1}
                            isRequired={true}
                        />
                    </View>
                </View>
                <CustomInput
                    placeholder="Peso (kg)"
                    label="Peso (kg)"
                    value={peso}
                    onChangeText={handleWeightChange}
                    keyboardType="numeric"
                    iconRight="scale-bathroom"
                />*/}

                <View
                    style={{
                        borderBottomColor: COLORS.border,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginVertical: 10,
                    }}
                />
                <CustomInput
                    placeholder="Descripción"
                    label="Descripción"
                    value={descripcion}
                    onChangeText={setDescripcion}
                    isMultiline
                />
                <CustomInput
                    placeholder="Notas"
                    label="Notas"
                    value={notas}
                    onChangeText={setNotas}
                    isMultiline
                />

                <CustomBottom
                    label="Guardar ejercicio"
                    iconName="content-save-outline"
                    onPress={handleSaveWorkout}
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
        backgroundColor: COLORS.background,
        paddingHorizontal: SIZES.base * 3,
    },
    formContainer: {
        width: '100%',
        marginTop: SIZES.base * 2,
    },
    wrapper: {
        width: '100%',
        marginTop: SIZES.base * 2,
        flexDirection: 'row',
        //justifyContent: 'space-between',
        gap: 15,
    },
    counterContainer: {
        flex: 1
    }
});
export default AddWorkout;