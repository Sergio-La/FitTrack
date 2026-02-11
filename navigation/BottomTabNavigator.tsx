// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { colors, typography } from '../theme';

// Creamos el "objeto" que controlará las pestañas
const Tab = createBottomTabNavigator();
// Estas funciones representan tus 5 pantallas vacías
const Dashboard = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Dashboard</Text></View>;
const Ejercicios = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Ejercicios</Text></View>;
const Rutinas = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Rutinas</Text></View>;
const PlanSemanal = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Plan Semanal</Text></View>;
const IniciarRutina = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Iniciar Rutina</Text></View>;

export const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            id="MainTabs"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.dark.textHigh, // Color del texto activo
                tabBarStyle: {
                    backgroundColor: colors.dark.background, // Fondo oscuro
                    borderTopColor: colors.dark.border,      // Línea superior sutil
                },
            }}
        >
            {/* Cada Screen es una pestaña individual */}
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="Ejercicios" component={Ejercicios} />
            <Tab.Screen name="Rutinas" component={Rutinas} />
            <Tab.Screen name="Plan" component={PlanSemanal} />
            <Tab.Screen name="Entrenar" component={IniciarRutina} />
        </Tab.Navigator>
    );
};