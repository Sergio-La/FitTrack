// 1. Se importa el contenedor principal de ract navigation
import { NavigationContainer } from '@react-navigation/native';
// 2. Se importa el navegador de pestañas que acabamos de crear
import { BottomTabNavigator } from './navigation/BottomTabNavigator';
// 3. Se importa la nueva pantalla
import { OnboardingName } from './screens/onboarding/OnboardingName';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <OnboardingName />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
