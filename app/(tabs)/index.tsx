import { FloatingButton } from '@/components/CustomFloatingButton';
import { COLORS } from '@/constants/theme'; // Asegúrate de usar tu ruta
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {

  const router = useRouter();

  const handleAddWorkoutButton = () => {
    router.push('/addWorkout');
  };

  const handleAboutYouButton = () => {
    router.push('/aboutYou');
  };

  const handleAddRoutineButton = () => {
    router.push('/addRoutine');
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <Text style={{ color: COLORS.textHigh }}>FitTrack está vivo... 🚀</Text>
      {/* <FloatingButton title="Add" onPress={handleAddWorkoutButton} iconName="plus-circle-outline" /> */}
      {/*<FloatingButton title="About You" onPress={handleAboutYouButton} iconName="account-plus-outline" />*/}
      <FloatingButton title="Agregar rutina" onPress={handleAddRoutineButton} iconName="plus-circle-outline" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});