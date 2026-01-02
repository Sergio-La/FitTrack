import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomHeader } from "../../components/CustomHeader";
import { COLORS } from "../../constants/theme";

const AddWorkout = () => {
    const router = useRouter();

    const handleBackButton = () => {
        router.back();
    };
    return (
        <SafeAreaView>
            <View style={styles.contentContainer}>
                <CustomHeader title="Add Workout" showBackButton onPress={handleBackButton} />
                <View style={styles.formContainer}>

                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: COLORS.background,
    },
    formContainer: {
        width: '100%',
    },
})
export default AddWorkout;