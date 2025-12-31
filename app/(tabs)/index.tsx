import { COLORS } from '@/constants/theme'; // Asegúrate de usar tu ruta
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <Text style={{ color: COLORS.textHigh }}>FitTrack está vivo 🚀</Text>
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