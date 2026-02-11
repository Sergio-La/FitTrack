// 1. Se importa el contenedor principal de ract navigation
import { NavigationContainer } from '@react-navigation/native';
// 2. Se importa el navegador de pestañas que acabamos de crear
import { BottomTabNavigator } from './navigation/BottomTabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
